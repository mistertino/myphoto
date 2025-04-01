/* eslint-disable react/jsx-no-constructed-context-values */
import type { ReactNode } from 'react';
import React, { createContext, useContext, useState } from 'react';

// Định nghĩa kiểu dữ liệu cho context
interface CollapsedContextType {
  collapsed: boolean;
  setCollapsed: (value: boolean) => void;
}

// Tạo context với kiểu dữ liệu ban đầu là undefined
const CollapsedContext = createContext<CollapsedContextType | undefined>(
  undefined,
);

// Định nghĩa Props cho Provider
interface CollapsedProviderProps {
  children: ReactNode;
}

// Provider component để cung cấp giá trị collapsed cho các component con
export const CollapsedProvider: React.FC<CollapsedProviderProps> = ({
  children,
}) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <CollapsedContext.Provider value={{ collapsed, setCollapsed }}>
      {children}
    </CollapsedContext.Provider>
  );
};

// Custom hook để sử dụng collapsed ở các component con
export const useCollapsed = (): CollapsedContextType => {
  const context = useContext(CollapsedContext);
  if (!context) {
    throw new Error('useCollapsed must be used within a CollapsedProvider');
  }
  return context;
};
