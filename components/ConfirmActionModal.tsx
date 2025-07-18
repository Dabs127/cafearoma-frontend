import { deleteUserProfile } from "@/actions/users/usersActions";

type Props = {
  onClose: () => void;
  actionType: "delete" | "confirm";
  action: (...args: any[]) => void | Promise<void>;
  id?: string;
};

type ActionProps = {
  id?: string;
  onClose: () => void;
  action: (...args: any[]) => void | Promise<void>;
  data?: FormData
};

const actionTitles: Record<string, string> = {
  delete: "Eliminar Perfil",
  deleteItem: "Eliminar item del menú",
  confirm: "Confirmar Acción",
};

const actionMessages: Record<string, string> = {
  delete: "Estas seguro que deseas eliminar? Esta acción no se puede deshacer.",
  deleteItem: "Estas seguro que deseas eliminar este item? Esta acción no se puede deshacer.",
  confirm: "Are you sure you want to proceed with this action?",
};
const actionActions: Record<
  string,
  (props: ActionProps) => void | Promise<void>
> = {
  delete: async ({ id, onClose, action }) => {
    console.log("Deleting item with ID:", id);
    if (id) {
      await action(id);
    }
    onClose();
  },
  update: async({onClose, action, data}) => {
    console.log("Updating item with ID:", (data || "No hay data aqui en confirm action modal update"));
    if (data) {
      await action(data)
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
    actionHandler({ id: props.id?.toString(), onClose: props.onClose, action: props.action });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 overflow-hidden">
      <div className="bg-white p-6 relative rounded-lg shadow-lg w-[80%] overflow-y-auto md:w-md">
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
