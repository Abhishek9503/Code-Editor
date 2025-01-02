import { useCodeEditorStore } from "@/store/useCodeEditor";
import { useMutation } from "convex/react";
import { useState } from "react";
import { api } from "../../../../convex/_generated/api";
import { XIcon } from "lucide-react";
import toast from "react-hot-toast";

function ShareSnippetDialog({ onClose }: { onClose: () => void }) {

    const [title, setTitle] = useState("");

    const [isSharing, setIsSharing] = useState(false);
    const { language, getCode } = useCodeEditorStore();


    const createSnippet = useMutation(api.snippets.createSnippet);


    const handleShare = async (e: React.FormEvent) => {
        debugger;
        e.preventDefault();

        setIsSharing(true);

        try {
            const code = getCode();

            await createSnippet({ title, language, code });
            onClose();
            setTitle("");
            toast.success("Snippet shared successfully");
        } catch (error) {

            console.error("Error creating snippet", error);
            toast.error("Error sharing snippet");

        }
        finally {
            setIsSharing(false);
        }

    }

    return (

        <div className="fixed  inset-0 bg-black/50 flex items-center justify-center z-50">

            <div className="bg-[#1e1e2e] rounded-lg p-6 w-full max-w-md">

                <div className="flex items-center justify-between mb-4">

                    <h2 className="text-xl font-semibold text-white">Share Snippet</h2>

                    <button onClick={onClose} className="text-gray-400 hover:text-gray-300">
                        <XIcon className="w-5 h-5" />
                    </button>

                </div>

                {/* hello ji */}

                <form onSubmit={handleShare}>

                    <div className="mb-4">
                        <label htmlFor="title" className="block text-sm font-medium text-gray-400 mb-2" >
                            Title
                        </label>

                        <input type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full px-3 py-2 bg-[#313244] border border-[#313244] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500  "

                            placeholder="Enter snippet title"
                            required

                        />
                    </div>

                    <div className="flex justify-end gap-3">

                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-gray-400 hover:text-gray-300"
                        >
                            Cancel
                        </button>

                        <button
                            type="button"
                            onClick={handleShare}
                            disabled={isSharing} className="px-4 py-2 bg-blue rounded-lg text-gray-400 hover:bg-blue-600 disabled:opacity-50"
                        >
                            {isSharing ? "Sharing..." : "Share"}
                        </button>

                    </div>


                </form>

            </div>

            Hello

        </div>
    )
}


export default ShareSnippetDialog;