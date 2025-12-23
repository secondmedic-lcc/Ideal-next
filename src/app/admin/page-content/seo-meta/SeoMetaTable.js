"use client";

import React, { useState } from "react";
import SeoMetaEditModal from "./SeoMetaEditModal";

export default function SeoMetaTable({ list }) {
  const [editRow, setEditRow] = useState(null);

  return (
    <>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Page Name</th>
            <th>Meta Title</th>
            <th>Meta Description</th>
            <th>Meta Keywords</th>
            <th width="120">Action</th>
          </tr>
        </thead>

        <tbody>
          {list.map((row, i) => (
            <tr key={i}>
              <td>{row.page_name}</td>
              <td>{row.meta_title}</td>
              <td>{row.meta_description}</td>
              <td>{row.meta_keywords}</td>
              <td>
                <button className="btn btn-sm btn-primary" onClick={() => setEditRow(row)}>
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editRow && <SeoMetaEditModal data={editRow} onClose={() => setEditRow(null)} />}
    </>
  );
}
