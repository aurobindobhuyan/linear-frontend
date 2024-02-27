import React, { createContext, useContext, useState, useEffect } from "react";

import "./snackbar.css";

interface SnackBarContextType {
  addItem: (message: string, timer?: number) => void;
}

interface IValue {
  message: string;
  id: string;
  ttl: number;
}

interface AddItemFunction {
  (message: string, timer?: number): void;
}

const SnackBarContext = createContext<SnackBarContextType | null>(null);

export const useSnackBar = () => {
  const context = useContext(SnackBarContext);
  if (!context) {
    throw new Error("SnackBar context must be used within a SnackBarProvider");
  }
  return context;
};

export const SnackBarProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [value, setValue] = useState<IValue[]>([]);

  const addItem: AddItemFunction = (message, timer = 2000) => {
    const currentTime = new Date().getTime();
    setValue([
      ...value,
      {
        message: message + `${value.length + 1}`,
        id: currentTime.toString(),
        ttl: currentTime + timer,
      },
    ]);
  };

  const removeItem = (id: string) => {
    setValue(value.filter((item) => item.id !== id));
  };

  useEffect(() => {
    if (value.length) {
      const timer = setInterval(() => {
        setValue((prevItems) =>
          prevItems.filter((item) => item.ttl > new Date().getTime())
        );
      }, 100);

      return () => clearInterval(timer);
    }
  }, [value]);

  const Child = () => {
    return (
      <div className="snackBar">
        <ul>
          {value.length
            ? value.map((ele: IValue) => {
                return (
                  <li onClick={() => removeItem(ele.id)} key={ele.id}>
                    <span>{ele.message}</span>
                    <span>&#x2715;</span>
                  </li>
                );
              })
            : null}
        </ul>
      </div>
    );
  };

  return (
    <SnackBarContext.Provider value={{ addItem }}>
      {children}
      <Child />
    </SnackBarContext.Provider>
  );
};
