import type { ReactNode } from "react";
import { createContext, useContext, useMemo } from "react";
import { ChatService } from "../../infrastructure";

interface ServiceProviderProps {
  children: ReactNode;
}

interface ServiceContextType {
  chatService: ChatService;
}

const ServiceContext = createContext<ServiceContextType | null>(null);

export const ServiceProvider = ({ children }: ServiceProviderProps) => {
  const services = useMemo(() => ({
    chatService: new ChatService()
  }), []);

  return (
    <ServiceContext.Provider value={services}>
      {children}
    </ServiceContext.Provider>
  );
};

export const useServices = () => {
  const context = useContext(ServiceContext);
  if (!context) throw new Error("useServices must be used within a ServiceProvider");

  return context;
};
