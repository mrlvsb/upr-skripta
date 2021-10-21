# Elsie 3.2
import shutil

from elsie import Arrow, Slides, TextStyle
from elsie.boxtree.box import Box
from elsie.text.textboxitem import TextBoxItem

slides = Slides()


def code(parent: Box, code: str, language="cpp", width=None, code_style="code", use_styles=True,
         p_right=10) -> TextBoxItem:
    content = parent.box(width=width)
    content.rect(bg_color="#FFFFFF")
    codebox = content.box(p_left=10, p_right=p_right, p_y=10, z_level=100, x=0)
    return codebox.code(language, code, style=code_style, use_styles=use_styles)


def line_arrow(codebox: TextBoxItem, line, step, text=None):
    box = codebox.line_box(line)
    arrow = Arrow(20)

    textbox = codebox.box(show=step,
                          x=box.p("130%", 0).x,
                          y=box.p(0, "50%").y).line([box.p("125%", "50%"), box.p("105%", "50%")],
                                                    end_arrow=arrow, color="orange",
                                                    stroke_width=5)
    if text:
        textbox.text(text, TextStyle(color="orange"))


@slides.slide()
def slide(slide: Box):
    slide.update_style("code", TextStyle(size=30))

    cols = slide.box(horizontal=True, y=0)
    code_col = cols.box(p_right=150, y=0)

    codebox = code(code_col.box(), """int fun1(int par) {
    int res = par * 2;
    if (res < 50) {
        return fun1(res);
    }
    else { return res; }
}
int fun2(int a, int b) {
    int x = a + b * 2;
    int y = fun1(x);
    return x + y;
}
int main() {
    printf("%d\\n", fun2(5, 6));
    return 0;
}""")

    stack_col = cols.box(y=0, width=120)

    def stack(wrapper: Box, funs):
        for fun in funs:
            frame = wrapper.sbox().rect(bg_color="black")
            frame = frame.sbox(p_bottom=5).rect(bg_color="#AAAAAA")
            frame = frame.sbox(padding=5)

            def draw_vars(data, color):
                for name, val in data:
                    var_wrapper = frame.box(width="fill").rect(bg_color=color)
                    var_wrapper.sbox(p_right=10, p_left=10, p_bottom=5).text(
                        "{}: {}".format(name, val), style=TextStyle(color="white", align="left"))

            frame.box(width="fill").text(fun["name"])
            draw_vars(fun.get("params", ()), "blue")
            draw_vars(fun.get("vars", ()), "red")

    def codestep(step, line, fns=()):
        stack(stack_col.overlay().sbox(show=step), [{"name": "main"}] + list(fns))
        line_arrow(codebox, line, "last")

    codestep("next", 13)
    codestep("next", 8, [{
        "name": "fun2",
        "params": (("a", 5), ("b", 6)),
        "vars": (("x", "?"), ("y", "?"))
    }])
    codestep("next", 9, [{
        "name": "fun2",
        "params": (("a", 5), ("b", 6)),
        "vars": (("x", "17"), ("y", "?"))
    }])
    codestep("next", 1, [{
        "name": "fun2",
        "params": (("a", 5), ("b", 6)),
        "vars": (("x", "17"), ("y", "?"))
    }, {
        "name": "fun1",
        "params": (("par", 17),),
        "vars": (("res", "?"),)
    }])
    codestep("next", 2, [{
        "name": "fun2",
        "params": (("a", 5), ("b", 6)),
        "vars": (("x", "17"), ("y", "?"))
    }, {
        "name": "fun1",
        "params": (("par", 17),),
        "vars": (("res", "34"),)
    }])
    codestep("next", 3, [{
        "name": "fun2",
        "params": (("a", 5), ("b", 6)),
        "vars": (("x", "17"), ("y", "?"))
    }, {
        "name": "fun1",
        "params": (("par", 17),),
        "vars": (("res", "34"),)
    }])
    codestep("next", 1, [{
        "name": "fun2",
        "params": (("a", 5), ("b", 6)),
        "vars": (("x", "17"), ("y", "?"))
    }, {
        "name": "fun1",
        "params": (("par", 17),),
        "vars": (("res", "34"),)
    }, {
        "name": "fun1",
        "params": (("par", 34),),
        "vars": (("res", "?"),)
    }])
    codestep("next", 2, [{
        "name": "fun2",
        "params": (("a", 5), ("b", 6)),
        "vars": (("x", "17"), ("y", "?"))
    }, {
        "name": "fun1",
        "params": (("par", 17),),
        "vars": (("res", "34"),)
    }, {
        "name": "fun1",
        "params": (("par", 34),),
        "vars": (("res", "68"),)
    }])
    codestep("next", 3, [{
        "name": "fun2",
        "params": (("a", 5), ("b", 6)),
        "vars": (("x", "17"), ("y", "?"))
    }, {
        "name": "fun1",
        "params": (("par", 17),),
        "vars": (("res", "34"),)
    }, {
        "name": "fun1",
        "params": (("par", 34),),
        "vars": (("res", "68"),)
    }])
    codestep("next", 5, [{
        "name": "fun2",
        "params": (("a", 5), ("b", 6)),
        "vars": (("x", "17"), ("y", "?"))
    }, {
        "name": "fun1",
        "params": (("par", 17),),
        "vars": (("res", "34"),)
    }, {
        "name": "fun1",
        "params": (("par", 34),),
        "vars": (("res", "68"),)
    }])
    codestep("next", 3, [{
        "name": "fun2",
        "params": (("a", 5), ("b", 6)),
        "vars": (("x", "17"), ("y", "?"))
    }, {
        "name": "fun1",
        "params": (("par", 17),),
        "vars": (("res", "34"),)
    }])
    codestep("next", 9, [{
        "name": "fun2",
        "params": (("a", 5), ("b", 6)),
        "vars": (("x", "17"), ("y", "?"))
    }])
    codestep("next", 10, [{
        "name": "fun2",
        "params": (("a", 5), ("b", 6)),
        "vars": (("x", "17"), ("y", "68"))
    }])
    codestep("next", 13, [])
    codestep("next", 14, [])


images = slides.render(export_type="png")
for (index, file) in enumerate(images):
    path = f"stack-{index}.png"
    shutil.copyfile(file, path)
