import dataclasses
import math
import shutil
from typing import List, Optional

from elsie import SlideDeck, TextStyle as T


@dataclasses.dataclass
class DataType:
    name: str
    size: int
    alignment: Optional[int] = None

    def __post_init__(self):
        if self.alignment is None:
            self.alignment = self.size

    @classmethod
    def char(cls, name: str) -> "DataType":
        return DataType(name=name, size=1)

    @classmethod
    def int(cls, name: str) -> "DataType":
        return DataType(name=name, size=4)

    @classmethod
    def ptr(cls, name: str) -> "DataType":
        return DataType(name=name, size=8)


@dataclasses.dataclass
class Structure:
    fields: List[DataType]
    packed: bool = False

    def gen_addresses(self, init_addr: int):
        address = init_addr
        max_alignment = 0
        for field in self.fields:
            if not self.packed and address % field.alignment != 0:
                to_align = (field.alignment - (address % field.alignment))
                yield (to_align, None, True)
                address += to_align
            yield (field.size, field, address % field.alignment == 0)
            address += field.size
            max_alignment = max(max_alignment, field.alignment)
        if not self.packed and address % max_alignment != 0:
            yield (max_alignment - (address % max_alignment), None, True)
        if not self.packed:
            assert init_addr % max_alignment == 0


def iter_structures(structures: List[Structure], last_address=0):
    for structure in structures:
        for (size, field, aligned) in structure.gen_addresses(last_address):
            last_address += size
            yield (size, field, aligned)


def gen_colors():
    colors = ["green", "red", "blue", "purple", "magenta"]
    while True:
        for color in colors:
            yield color


def render_structures(structures: List[Structure], path: str, init_addr: int):
    width = 8
    dim = 32

    total_bytes = sum(data[0] for data in iter_structures(structures))

    grid = []
    rows = math.ceil(total_bytes / width)
    color_generator = gen_colors()
    color_map = {}

    def get_color(name: str):
        if name in color_map:
            return color_map[name]
        color_map[name] = next(color_generator)
        return color_map[name]

    slides = SlideDeck(width=width * dim, height=rows * dim)
    slide = slides.new_slide()

    for row_index in range(rows):
        row = slide.box(horizontal=True, width=width * dim)
        for col_index in range(width):
            box = row.box(width=dim, height=dim)
            grid.append(box)

    address = 0
    for (size, field, aligned) in iter_structures(structures, init_addr):
        color = get_color(field.name) if field is not None else "gray"
        for _ in range(size):
            wrapper_box = grid[address]
            new_box = slide.box(x=wrapper_box.x(0), y=wrapper_box.y(0), height=dim,
                                width=dim, z_level=1)
            new_box.rect(bg_color=color, color="black",
                         stroke_dasharray=str(0 if aligned else 4))
            if field is not None:
                new_box.text(field.name, style=T(size=12))

            text_dim = 16
            address_box = slide.box(
                x=wrapper_box.x(0).add(dim - text_dim),
                y=wrapper_box.y(0),
                width=text_dim,
                height=text_dim,
                z_level=2
            )
            address_box.text(str(init_addr + address), style=T(size=8))

            address += 1

    ret = slides.render("foo.png", export_type="png")
    shutil.copyfile(ret[0], path)


render_structures([
    Structure(fields=[DataType.char("a"), DataType.int("b")],
              packed=True)], "padding1-packed.png",
    init_addr=16
)
render_structures([
    Structure(fields=[DataType.char("a"), DataType.int("b")])], "padding1-unpacked.png",
    init_addr=16
)
str2 = Structure(fields=[DataType.int("a"), DataType.char("b")], packed=True)
render_structures([str2, str2], "padding2-packed.png", init_addr=16)
str2 = Structure(fields=[DataType.int("a"), DataType.char("b")])
render_structures([str2, str2], "padding2-unpacked.png", init_addr=16)

render_structures([
    Structure(
        fields=[DataType.char("a"), DataType.int("b"), DataType.char("c"), DataType.ptr("d")])
], "padding3.png", init_addr=16)

render_structures([
    Structure(
        fields=[DataType.ptr("a"), DataType.int("b"), DataType.char("c"), DataType.char("d")])
], "padding4.png", init_addr=16)

render_structures([
    Structure(fields=[DataType.int("a"), DataType.ptr("b")])
], "padding5.png", init_addr=16)

render_structures([
    Structure(fields=[DataType(name="a", size=4, alignment=1), DataType.char("b")])
], "padding6.png", init_addr=16)

render_structures([
    Structure(fields=[DataType(name="a", size=2), DataType.char("b"), DataType.char("c"),
                      DataType.int("d")])
], "padding7.png", init_addr=16)
