import { LANGUAGE_CONFIG } from "@/app/(root)/_constants";
import { create } from "zustand";
import { Monaco } from "@monaco-editor/react";
import { CodeEditorState } from "@/types";


const getInitialState = () => {
    //if we are on server  side  return default values

    if (typeof window === "undefined") {
        return {
            language: "javascript",
            fontSize: 16,
            theme: "vs-dark",
        }
    }

    // if we are on client side get the values from local storage because local storage is browser api so i can access it only on client side
    const savedLanguage = localStorage.getItem("editor-language") || "javascript";
    const savedTheme = localStorage.getItem("editor-theme") || "vs-dark";
    const savedFontSize = localStorage.getItem("editor-font-size") || 16;

    return {
        language: savedLanguage,
        theme: savedTheme,
        fontSize: Number(savedFontSize),

    }
}



export const useCodeEditorStore = create<CodeEditorState>((set, get) => {

    const initialState = getInitialState();
    return {
        ...initialState,
        isRunning: false,
        error: null,
        editor: null,
        executionResult: null,

        getCode: () => get().editor?.getValue() || "",

        setEditor: (editor: Monaco) => {
            const savedCode = localStorage.getItem(`editor-code-${get().language}`) || "";

            if (savedCode) {
                editor.setValue(savedCode);
            }
            set({ editor });
        },


        setTheme: (theme: string) => {
            localStorage.setItem("editor-theme", theme);
            set({ theme });
        },

        setFontSize: (fontSize: number) => {
            localStorage.setItem("editor-font-size", String(fontSize));
            set({ fontSize });
        },

        setLanguage: (language: string) => {

            //save the current language in local storage
            const currentCode = get().editor?.getValue();
            if (currentCode) {
                localStorage.setItem(`editor-code-${get().language}`, currentCode);
            }

            localStorage.setItem("editor-language", language);

            set({
                language,
                output: "",
                error: null,

            })
        },

        runCode: async () => {
            //TODO - 
            //1. get the code from the editor
            //2. send the code to the server
            //3. get the result from the server
            //4. set the result in the state
            //5. handle the error if any
            //6. set the isRunning to false
            //7. handle the error if any
        } 
    }
})
