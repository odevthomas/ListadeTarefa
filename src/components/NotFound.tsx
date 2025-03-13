import React from "react";
import { Button } from "./ui/button";
import { FileQuestion, Home } from "lucide-react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white dark:bg-slate-800 rounded-xl shadow-md overflow-hidden p-8 text-center border border-indigo-100 dark:border-indigo-900/30">
        <div className="rounded-full bg-indigo-50 dark:bg-indigo-900/30 p-6 mx-auto w-24 h-24 flex items-center justify-center mb-6">
          <FileQuestion className="h-12 w-12 text-indigo-500 dark:text-indigo-400" />
        </div>

        <h1 className="text-4xl font-bold text-indigo-700 dark:text-indigo-300 mb-2">
          404
        </h1>
        <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-200 mb-4">
          Página não encontrada
        </h2>

        <p className="text-slate-600 dark:text-slate-400 mb-8">
          A página que você está procurando não existe ou foi movida para outro
          endereço.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={() => window.history.back()}
            variant="outline"
            className="border-indigo-200 dark:border-indigo-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300"
          >
            Voltar
          </Button>

          <Button
            asChild
            className="bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            <Link to="/">
              <Home className="mr-2 h-4 w-4" />
              Ir para Início
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
