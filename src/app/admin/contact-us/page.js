"use client";
import React from 'react'
import { useQuery } from '@tanstack/react-query';
import { getContactRequest, deleteContactRequest } from "@/services/admin/contactUsServices";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import swal from 'sweetalert';

const ContactUs = () => {

    const queryClient = useQueryClient();

    const { data, isPending, isError } = useQuery({
        queryKey: ['contact-request'],
        queryFn: getContactRequest,
    });

    const requestList = data?.data?.list || data?.list;


    const { mutate: deleteMutate } = useMutation({
        mutationFn: (id) => deleteContactRequest(id),
        onSuccess: (result) => {
            if (result?.status) {
                swal("Deleted!", result.message || "Contact Request deleted successfully", "success");
                queryClient.invalidateQueries(["contact-request"]);
            } else {
                swal("Error", result?.message || "Something went wrong", "error");
            }
        },
        onError: (err) => {
            swal("Error", err?.message || "Failed to delete Contact Request", "error");
        },
    });

    const handleDelete = (id) => {
        swal({
            title: "Are you sure?",
            text: "This course will be permanently deleted!",
            icon: "warning",
            buttons: ["Cancel", "Yes, Delete"],
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                deleteMutate(id);
            }
        });
    };

    return (
        <>
            <div className='row'>
                <div className='col-md-12'>
                    <div className='card'>
                        <div className='card-header'>
                            Manage Contact Request
                        </div>
                        <div className='card-body'>
                            {
                                isPending &&
                                <div className='text-center py-4'>
                                    Contact request data is loading...
                                </div>
                            }
                            {
                                !isPending && <div className='table-responsive'>
                                    <table className='table table-bordered' width={"100%"}>
                                        <thead>
                                            <tr>
                                                <th>Sr.</th>
                                                <th>Name</th>
                                                <th>Contact</th>
                                                <th>Subject</th>
                                                <th>Message</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                requestList?.map((data, index) => (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>{data?.name}</td>
                                                        <td>{data?.email}<br />{data?.contact}</td>
                                                        <td>{data?.subject}</td>
                                                        <td>{data?.message}</td>
                                                        <td>
                                                            <button
                                                                onClick={() => handleDelete(data.id)}
                                                                className="btn btn-danger text-sm px-3 py-1"
                                                            >
                                                                Delete
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ContactUs
