"use client";

import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getContactRequest,
  deleteContactRequest,
} from "@/services/admin/contactUsServices";
import swal from "sweetalert";
import {
  FiMail,
  FiTrash2,
  FiUser,
  FiPhone,
  FiMessageSquare,
} from "react-icons/fi";

const ContactUs = () => {
  const queryClient = useQueryClient();

  const { data, isPending, isError } = useQuery({
    queryKey: ["contact-request"],
    queryFn: getContactRequest,
  });

  const requestList = data?.data?.list || data?.list || [];

  const { mutate: deleteMutate, isPending: isDeleting } = useMutation({
    mutationFn: (id) => deleteContactRequest(id),
    onSuccess: (result) => {
      if (result?.status) {
        swal(
          "Deleted!",
          result.message || "Contact request deleted successfully",
          "success"
        );
        queryClient.invalidateQueries(["contact-request"]);
      } else {
        swal("Error", result?.message || "Something went wrong", "error");
      }
    },
    onError: (err) => {
      swal(
        "Error",
        err?.message || "Failed to delete contact request",
        "error"
      );
    },
  });

  const handleDelete = (id) => {
    swal({
      title: "Are you sure?",
      text: "This contact request will be permanently deleted!",
      icon: "warning",
      buttons: ["Cancel", "Yes, Delete"],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        deleteMutate(id);
      }
    });
  };

  if (isPending) {
    return <div className="admin-page">Loading contact requests…</div>;
  }

  if (isError) {
    return (
      <div className="admin-page text-danger">
        Failed to load contact requests.
      </div>
    );
  }

  return (
    <div className="admin-page">
      <div className="admin-card">
        {/* Header */}
        <div className="admin-card-header">
          <div className="admin-card-title-wrap">
            <FiMail size={18} />
            <h5 className="admin-card-title">Contact Requests</h5>
          </div>
        </div>

        {/* Body */}
        <div className="admin-card-body">
          {requestList.length === 0 ? (
            <div className="admin-empty">
              No contact requests found.
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table admin-table align-middle">
                <thead>
                  <tr>
                    <th style={{ width: "60px" }}>#</th>
                    <th>Name</th>
                    <th>Contact</th>
                    <th>Subject</th>
                    <th>Message</th>
                    <th className="text-end">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {requestList.map((item, index) => (
                    <tr key={item.id || index}>
                      <td>{index + 1}</td>

                      <td className="fw-medium">
                        <div className="d-flex align-items-center gap-2">
                          <FiUser />
                          {item?.name}
                        </div>
                      </td>

                      <td>
                        <div className="small">
                          <div className="d-flex align-items-center gap-2">
                            <FiMail />
                            {item?.email}
                          </div>
                          <div className="d-flex align-items-center gap-2">
                            <FiPhone />
                            {item?.contact}
                          </div>
                        </div>
                      </td>

                      <td className="fw-medium">
                        {item?.subject}
                      </td>

                      <td className="text-muted">
                        <div className="d-flex gap-2">
                          <FiMessageSquare />
                          <span>{item?.message}</span>
                        </div>
                      </td>

                      <td className="text-end">
                        <button
                          className="icon-btn delete ms-auto"
                          disabled={isDeleting}
                          onClick={() =>
                            handleDelete(item.id)
                          }
                          title="Delete Request"
                        >
                          <FiTrash2 />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
