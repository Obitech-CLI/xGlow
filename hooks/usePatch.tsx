"use client";

import { useErrorModal, useSuccessModal } from "@/contexts/modalContext";
import { api } from "@/lib/axios";
import axios from "axios";
import { useState } from "react";

function UsePatch() {
  const [loading, setLoading] = useState(false);

  const { setSuccessMsg } = useSuccessModal();
  const { setErrorMsg } = useErrorModal();

  const Patch = async (url: string, editData: any) => {
    try {
      if (!navigator.onLine) {
        setErrorMsg("no internet connection");
        return;
      }

      setLoading(true);

      const { data } = await api.patch(url, editData);

      setSuccessMsg(data.message);

      return data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.code === "ECONNABORTED") {
          setErrorMsg("request timed out");
          return;
        }
        setErrorMsg(err.response?.data?.error ?? "something went wrong");
      } else {
        console.error(err);
      }
    } finally {
      setLoading(false);
    }
  };

  return { Patch, loading };
}

export { UsePatch };
