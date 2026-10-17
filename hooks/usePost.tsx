"use client";

import { useErrorModal, useSuccessModal } from "@/contexts/modalContext";
import { api } from "@/lib/axios";
import axios from "axios";
import { useState } from "react";

function UsePost() {
  const [loading, setLoading] = useState(false);

  const { setSuccessMsg } = useSuccessModal();
  const { setErrorMsg } = useErrorModal();

  const Post = async (url: string, formData: any) => {
    try {
      if (!navigator.onLine) {
        setErrorMsg("no internet connection");
        return;
      }

      setLoading(true);

      const { data } = await api.post(url, formData);

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

  return { Post, loading };
}

export { UsePost };
