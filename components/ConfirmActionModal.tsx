import { deleteUserProfile } from "@/actions/users/usersActions";

type Props = {
  onClose: () => void;
  actionType: "delete" | "confirm";
  id?: string | number;
};

type ActionProps = {
  id?: string;
  onClose: () => void;
};

const actionTitles: Record<string, string> = {
  delete: "Eliminar Perfil",
  confirm: "Confirmar Acción",
};

const actionMessages: Record<string, string> = {
  delete: "Estas seguro que deseas eliminar? Esta acción no se puede deshacer.",
  confirm: "Are you sure you want to proceed with this action?",
};
const actionActions: Record<
  string,
  (props: ActionProps) => void | Promise<void>
> = {
  delete: async ({ id, onClose }) => {
    console.log("Deleting user with ID:", id);
    if (id) {
      await deleteUserProfile(id);
    }
    onClose();
  },
  confirm: ({ onClose }) => {
    console.log("Action confirmed");
    onClose();
  },
};

const ConfirmActionModal = (props: Props) => {
  const actionTitle = actionTitles[props.actionType] || "Confirm Action";

  const actionMessage =
    actionMessages[props.actionType] || "Are you sure you want to proceed?";

  const actionHandler = actionActions[props.actionType] || (() => {});

  const handleAction = () => {
    console.log("Handling action:", props.actionType);
    actionHandler({ id: props.id?.toString(), onClose: props.onClose });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 relative rounded-lg shadow-lg w-132 max-h-[70vh] overflow-y-auto">
        <h2 className="text-2xl font-semibold mb-4">{actionTitle}</h2>
        <p className="mb-6">{actionMessage}</p>
        <div className="flex justify-end gap-4">
          <button
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded cursor-pointer hover:bg-gray-400"
            onClick={props.onClose}
          >
            Cancelar
          </button>
          <button
            className={`px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 cursor-pointer ${
              props.actionType === "delete"
                ? "bg-red-600 hover:bg-red-700"
                : "bg-secondary hover:bg-secondary/80"
            }`}
            onClick={handleAction}
          >
            Confirm
          </button>
        </div>
        <button
          className="absolute right-5 top-5 text-3xl cursor-pointer"
          onClick={props.onClose}
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default ConfirmActionModal;
