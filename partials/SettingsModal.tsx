import {
  deleteUserProfile,
  getUserProfile,
  logoutUser,
  updateUserProfile,
} from "@/actions/users/usersActions";
import ConfirmActionModal from "@/components/ConfirmActionModal";
import { redirect } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { CiFloppyDisk } from "react-icons/ci";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaDoorOpen, FaGear } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { LuUser } from "react-icons/lu";
import { toast } from "sonner";

type Props = {
  onClose: () => void;
};

type UserInputs = {
  name: string;
  phone: string;
  email: string;
};

const SettingsModal = (props: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserInputs>({
    defaultValues: {
      name: "",
      phone: "",
      email: "",
    },
  });
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  const t = useTranslations("SettingsModal");

  useEffect(() => {
    async function fetchUserProfile() {
      const data = await getUserProfile();
      if (data) {
        setUserId(data.user._id);
        reset({
          name: data.user.username,
          phone: data.user.phone,
          email: data.user.email,
        });
      }
    }

    fetchUserProfile();
  }, [reset]);

  const onSubmit = async (data: UserInputs) => {
    const { success, message } = await updateUserProfile({
      name: data.name,
      phone: data.phone,
      email: data.email,
    });

    if (!success) {
      toast.error(t("errorUpdateMessage") || message, {
        richColors: true,
        position: "top-center",
      });
      return;
    }

    toast.success(t("successUpdateMessage"), {
      richColors: true,
      position: "top-center",
    });

    props.onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      {deleteModalOpen && (
        <ConfirmActionModal
          actionTitle={t("deleteTitle")}
          actionMessage={t("deleteMessage")}
          onClose={() => setDeleteModalOpen(false)}
          actionType="delete"
          action={async () => {
            const response = await deleteUserProfile(userId!);

            if (!response.success) {
              toast.error(t("deleteSuccessMessage") || response.message, {
                richColors: true,
                position: "top-center",
              });
              return;
            }

            toast.success(t("deleteSuccessMessage") || response.message, {
              richColors: true,
              position: "top-center",
            });

            props.onClose();
            setTimeout(() => {
              redirect({ href: "/", locale: "es" });
            }, 1000);
          }}
          id={userId!}
        />
      )}
      <div className="bg-white relative rounded-lg shadow-lg w-[90%] h-[70%] overflow-y-auto md:w-132">
        <div className="bg-white fixed w-[90%] h-15 border-b-2 rounded-t-lg px-3 border-b-gray-200 flex justify-between items-center gap-x-4 md:w-132">
          <div className="flex items-center space-x-3">
            <FaGear className="w-9 h-9 text-2xl text-white bg-accent p-2 rounded-full" />
            <h2 className="text-2xl font-bold text-secondary">{t("title")}</h2>
          </div>
          <IoMdClose
            className="text-3xl cursor-pointer text-gray-400"
            onClick={props.onClose}
          />
        </div>
        <div className="flex items-center gap-x-4 mb-8 mt-7 px-6 pt-10">
          <LuUser className="w-6 h-6 text-white bg-secondary p-1 rounded-full" />
          <h3 className=" text-xl">{t("subtitlePersonalInfo")}</h3>
        </div>
        <form
          className="flex flex-col gap-y-5 ml-10 pr-2 md:pr-8"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col gap-y-2">
            <label className="text-gray-500" htmlFor="name">
              {t("form.labelName")}
            </label>
            <input
              type="text"
              id="name"
              className="border border-gray-300 p-2 rounded-lg"
              placeholder={t("form.inputName")}
              {...register("name")}
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <label className="text-gray-500" htmlFor="name">
              {t("form.labelPhone")}
            </label>
            <input
              type="text"
              id="phone"
              className="border border-gray-300 p-2 rounded-lg"
              placeholder={t("form.inputPhone")}
              {...register("phone")}
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <label className="text-gray-500" htmlFor="name">
              {t("form.labelEmail")}
            </label>
            <input
              type="text"
              id="email"
              className="border border-gray-300 p-2 rounded-lg"
              placeholder={t("form.inputEmail")}
              {...register("email")}
            />
          </div>

          <button
            type="submit"
            className="mt-5 bg-accent text-white p-3 rounded-lg flex items-center justify-center gap-x-2 cursor-pointer hover:bg-accent/90 transition duration-300"
          >
            <CiFloppyDisk className="w-6 h-6" />
            {t("form.submitButton")}
          </button>
        </form>

        <hr className="w-full my-7 text-gray-300" />

        <div className="flex items-center gap-x-4 mb-8 mt-7 px-6">
          <FaDoorOpen className="w-6 h-6 text-white bg-secondary p-1 rounded-full" />
          <h3 className=" text-xl">{t("accountConfiguration")}</h3>
        </div>

        <button
          className="w-[85%] border border-gray-300 p-3 mr-25 text-md text-gray-500 rounded-lg flex items-center gap-x-2 mb-5 ml-10 cursor-pointer hover:bg-gray-100 transition duration-300"
          onClick={async () => {
            props.onClose();
            const response = await logoutUser();

            if (!response.success) {
              toast.error(t("errorLogoutMessage") || response.message, {
                richColors: true,
                position: "top-center",
              });
              return;
            }

            toast.success(t("successLogoutMessage"), {
              richColors: true,
              position: "top-center",
            });

            setTimeout(() => {
              window.location.reload();

              redirect({ href: "/", locale: "es" });
            }, 1000);
          }}
        >
          <FaDoorOpen className="w-4 h-4 text-gray-500" />
          {t("logout")}
        </button>
        <button
          className="w-[85%] border border-red-500 p-3 text-md text-red-500 rounded-lg flex items-center gap-x-2 mb-5 ml-10 cursor-pointer hover:bg-red-100 transition duration-300"
          onClick={() => {
            setDeleteModalOpen(true);
          }}
        >
          <FaRegTrashAlt className="w-4 h-4 text-red-500" />
          {t("deleteAccount")}
        </button>
      </div>
    </div>
  );
};

export default SettingsModal;
