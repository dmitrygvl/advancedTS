import React from "react";

/**
Задание к TypeScript: Part 2 будет проверять ваше умение использовать и вычислять типы
Все задания устроены таким образом что в них есть тип FIXME 
(который any) и ваша задача избавится от него
Менять код кроме типов нельзя, исходные типы менять тоже нельзя, но можно рефакторить
Например `type A = 1 | 2` выразить как `type A1 = 1; type A2 = 2; type A = A1 | A2;`
* */

// В функцию приходит массив состояний заказа и фильтруется
// Нужно заменить FIXME на тип который вычисляется на освове OrderState

const orderStates = [
  "initial",
  "inWork",
  "buyingSupplies",
  "producing",
  "fullfilled",
] as const;

type OrderState = (typeof orderStates)[number];
type FilteredOrderState = Exclude<OrderState, "buyingSupplies" | "producing">;

export const getUserOrderStates = (
  orderStates: OrderState[],
): FilteredOrderState[] => {
  const filteredStates = [] as FilteredOrderState[];
  orderStates.forEach((element) => {
    if (element !== "buyingSupplies" && element !== "producing") {
      filteredStates.push(element);
    }
  });
  return filteredStates;
};

// Есть объединение (юнион) типов заказов в различных состояниях
// Нужно заменить FIXME на тип который достанет из Order все возможные состояния (state)

type Order =
  | {
      state: "initial";
      sum: number;
    }
  | {
      state: "inWork";
      sum: number;
      workerId: number;
    }
  | {
      state: "buyingSupplies";
      sum: number;
      workerId: number;
      suppliesSum: number;
    }
  | {
      state: "producing";
      sum: number;
      workerId: number;
      suppliesSum: number;
      produceEstimate: Date;
    }
  | {
      state: "fullfilled";
      sum: number;
      workerId: number;
      suppliesSum: number;
      produceEstimate: Date;
      fullfillmentDate: Date;
    };

type OrderStates = Order["state"];

export const getOrderState = (order: Order): OrderStates => order.state;

// Есть общая функция omit которая удаляет поле из объекта и возвращает его без этого поля
// Нужно заменить FIXME на соответствующий тип

type Omitted<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export const omit = <T extends Record<any, any>, K extends keyof T>(
  obj: T,
  keyToOmit: K,
): Omitted<T, K> => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { [keyToOmit]: _, ...withoutKey } = obj;
  return withoutKey;
};

// Есть объединение (юнион) типов заказов в различных состояниях
// и функция filterOnlyInitialAndInWorkOrder которая принимает заказы в любых состояниях
// А возвращает только initial и inWork
// Нужно заменить FIXME на правильный тип вычисленный на основе Order

type InitialAndInWorkOrder = Extract<Order, { state: "initial" | "inWork" }>;

type TOrder =
  | {
      state: "initial";
      sum: number;
    }
  | {
      state: "inWork";
      sum: number;
      workerId: number;
    }
  | {
      state: "buyingSupplies";
      sum: number;
      workerId: number;
      suppliesSum: number;
    }
  | {
      state: "producing";
      sum: number;
      workerId: number;
      suppliesSum: number;
      produceEstimate: Date;
    }
  | {
      state: "fullfilled";
      sum: number;
      workerId: number;
      suppliesSum: number;
      produceEstimate: Date;
      fullfillmentDate: Date;
    };

export const filterOnlyInitialAndInWorkOrder = (
  order: TOrder,
): InitialAndInWorkOrder | null => {
  if (order.state === "initial" || order.state === "inWork") {
    return order;
  }

  return null;
};

// Есть функция которая достает из реакт компонента (любого, и Functional и Class) его defaultProps
// Нужно заменить FIXME на правильный тип

// Hint: infer
export const getDefaultProps = <T>(
  component: React.ComponentType<T>,
): Partial<T> | undefined => component.defaultProps;

// Задача состоит в том что написать калькулятор для натуральных чисел, но только на типах!
// Ниже приведена заготовка
// Хочется поддержки сложения и вычитания, если хочется еще челленджа, то деление и умножение
// Из-за ограничений глубины вычислений поддержать все натуральные числа не получится, это нормально

type Numbers = [never, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

type CreateArr<
  N extends number,
  Arr extends any[] = [],
> = Arr["length"] extends N ? Arr : CreateArr<N, [...Arr, any]>;

type Equal<A, B> = A extends B ? (B extends A ? "success" : never) : never;

type Add<A extends number, B extends number> = [
  ...CreateArr<A>,
  ...CreateArr<B>,
]["length"];

type SubtractOne<A extends number> = A extends infer N extends number
  ? Numbers[N]
  : never;

type Subtract<
  A extends number,
  B extends number,
  Counter extends any[] = [],
> = Counter["length"] extends B
  ? A
  : Subtract<SubtractOne<A>, B, [any, ...Counter]>;

export type OnePlusOneTest = Equal<Add<1, 1>, 2>;
export type TwoMinusOneTest = Equal<Subtract<2, 1>, 1>;
