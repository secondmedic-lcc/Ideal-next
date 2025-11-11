"use client";
import React from 'react';
import { useFAQHooks } from '@/hooks/admin/useFAQHooks';


const AddFAQs = () => {

    const { handleSubmit, mutate, register, } = useFAQHooks();

    return (
        <>
            <div className='row'>
                <div className='col-md-12'>
                    <div className='card'>
                        <div className='card-header'>
                            Manage FAQ
                        </div>
                        <div className='card-body'>
                            <form onSubmit={handleSubmit(mutate)} method='POST'>
                                <div className='row'>
                                    <div className='col-md-12'>
                                        <div className='form-group'>
                                            <label>FAQ Title</label>
                                            <input type='text' className='form-control' name='title' {...register('title')} />
                                        </div>
                                        <div className='form-group mt-3'>
                                            <label>FAQ Description</label>
                                            <textarea className='form-control' name='description' {...register('description')} rows={10}></textarea>
                                        </div>
                                        <div className='form-group mt-3'>
                                            <button type='submit' className='btn btn-primary'>
                                                Add FAQ
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddFAQs;