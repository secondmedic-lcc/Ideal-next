"use client";

import React from 'react'
import { useParams } from "next/navigation";
import CustomPageSectionsComponent from './CustomPageSectionsComponent';

function CustomPageSections() {
   const { page_id } = useParams();
  return <CustomPageSectionsComponent page_id={page_id} />
}

export default CustomPageSections