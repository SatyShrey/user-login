import { useValues } from "@/contexts/contexts";
import { saveData } from "@/firebase/firebase";
import { Check, X } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

function EditName({ oncloseClick }) {
  const { setuser, user, setviewLoder } = useValues();
  const [name, setname] = useState("");

  const saveName = async () => {
    if (!name) {
      return toast.error("Please enter a name");
    }
    setviewLoder(true);
    try {
      await saveData(user.uid, "username", { username: name });
      setuser((user) => ({ ...user, displayName: name }));
      toast.success("Name updated successfully");oncloseClick();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setviewLoder(false);
    }
  };

  return (
    <div className="w-full">
      <div className="">
        <input
          type="text"
          placeholder="Enter name"
          className="h-10 p-3 mt-3 outline-0 bg-white rounded placeholder:text-gray-500 text-gray-900 w-full"
          onChange={(e) => setname(e.target.value)}
        />
      </div>
      <div className="flex gap-1 mt-1 mb-3 justify-center">
        <button onClick={oncloseClick} className="btn flex-1">
          <X />
        </button>
        <button onClick={saveName} className="btn btn-success flex-1">
          <Check />
        </button>
      </div>
    </div>
  );
}

export default EditName;
