# Struktury
Vytvořte strukturu `Student`, která bude obsahovat atributy pro jeho věk, jméno, počet bodů a
nejlepšího přítele (to bude také student). Dále naimplementujte tyto funkce:
```c
/**
 * Nainicializujte studenta se zadaným věkem a jménem.
 * Počet bodů i nejlepší přítel by měli být nastaveni na nulu.
 */
void student_init(Student* student, int age, const char* name) {}

/**
 * Spočítejte, kolik studentů v předaném poli má maximálně zadaný věk.
 * Příklad:
 *   Student students[3];
 *   students[0].age = 18;
 *   students[1].age = 19;
 *   students[2].age = 16;
 *
 *   count_young_students(students, 3, 18); // 2
 */
int count_young_students(Student* students, int count, int maximum_age) {}

/**
 * Přiřaďte studentům body na základě výsledků testů.
 * V poli `points` jsou body pro jednotlivé studenty v poli `students`.
 * Parameter `count` obsahuje počet studentů a testů.
 */
void assign_points(Student* students, const int* points, int count) {}

/**
 * Vraťe v parametru `good_students` pole studentů, kteří mají alespoň 51 bodů a v
 * parametru `good_student_count` jejich počet.
 * Budete muset dynamicky naalokovat nové pole s odpovídající velikostí.
 */
void filter_good_students(
    const Student* students,
    int count,
    Student** good_students,
    int* good_student_count
);

/**
 * Otestujte, jestli je student šťastný.
 * Student je šťastný, pokud:
 * 1) Má alespoň 51 bodů, a zároveň
 * 2) Jeho nejlepší přítel je šťastný
 *
 * Pokud student nemá nejlepšího přítele, pokládejte podmínku 2) za splněnou.
 */
int student_is_happy(Student* student) {}
```

K otestování vaší implementace můžete použít následující testovací program[^1]:
<details>
<summary>Testovací program</summary>

```c
#include <assert.h>
#include <stdio.h>
#include <string.h>
#include <stdlib.h>

// Zde vložte implementace funkcí

int main()
{
    Student jirka;
    student_init(&jirka, 18, "Jiri Novak");
    assert(jirka.age == 18);
    assert(!strcmp(jirka.name, "Jiri Novak"));
    assert(jirka.points == 0);
    assert(jirka.best_friend == NULL);

    Student students[3];
    for (int i = 0; i < 3; i++)
    {
        student_init(students + i, 17 + i, "");
    }
    assert(count_young_students(students, 3, 18) == 2);

    int points[] = { 10, 15, 3 };
    assign_points(students, points, 3);
    assign_points(students, points, 1);
    assert(students[0].points == 20);
    assert(students[1].points == 15);
    assert(students[2].points == 3);

    Student a = {}, b = {}, c = {};
    a.points = 51;
    b.points = 50;
    c.points = 50;
    assert(student_is_happy(&a));
    a.best_friend = &b;
    assert(!student_is_happy(&a));
    b.points = 51;
    assert(student_is_happy(&a));
    b.best_friend = &c;
    assert(!student_is_happy(&a));
    c.points = 100;
    assert(student_is_happy(&a));

    Student students2[3] = {};
    students2[0].age = 15;
    students2[2].age = 18;
    int points2[] = { 51, 20, 60 };
    assign_points(students2, points2, 3);

    Student* good_students;
    int good_students_count;
    filter_good_students(students2, 3, &good_students, &good_students_count);
    assert(good_students_count == 2);
    assert(good_students[0].age == 15);
    assert(good_students[1].age == 18);

    free(good_students);

    return 0;
}
```
</details>

[^1]: Implementace svých funkcí v tomto programu umístěte nad `main` a program spusťte s
[`Address sanitizerem`](../prostredi/ladeni.md#address-sanitizer). Pokud program nic nevypíše, máte
implementaci pravděpodobně správně.
