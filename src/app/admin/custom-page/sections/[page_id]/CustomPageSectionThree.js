"use client"
import React, { useEffect, useState } from 'react'
import {
  listHomeSlider,
  createHomeSlider,
  updateHomeSlider,
  deleteHomeSlider,
  getSection3,
  updateSection3
} from "@/services/admin/customPageSectionsThreeServices";
import { Button, Col, Form, Modal, Row, Table } from 'react-bootstrap';
import { imageUrl } from "@/services/baseUrl";

function CustomPageSectionThree({page_id}) {
    const [sec1, setSec1] = useState(null);
    const [sec1Form, setSec1Form] = useState({
        title: "",
        description: "",
        status: 0,
        image: null,
    });
    
    // ================== Slider State ==================
    const [sliderList, setSliderList] = useState([]);
    const [sliderLoading, setSliderLoading] = useState(false);

    const [showSliderModal, setShowSliderModal] = useState(false);
    const [isEditSlider, setIsEditSlider] = useState(false);
    const [editingSliderId, setEditingSliderId] = useState(null);

    const [sliderForm, setSliderForm] = useState({
        custom_page_id: page_id,
        title: "",
        status: 0, 
        image: null,
    });

    const loadSlider = async () => {
        setSliderLoading(true);
        try {
            const res = await listHomeSlider(page_id);
            setSliderList(res?.data?.list || []);
        } catch (e) {
            setSliderList([]);
        } finally {
            setSliderLoading(false);
        }
    };
    const loadSections = async () => {
        try {
            const s1 = await getSection3(page_id);
            const row1 = s1?.data?.row || null;
            setSec1(row1);
            if (row1) {
            setSec1Form({
                title: row1.title || "",
                description: row1.description || "",
                status: Number(row1.status ?? 0),
                image: null,
            });
            }
        } catch (e) {
            setSec1(null);
        }
    }

    useEffect(() => {
        loadSlider();
        loadSections();
    }, []);

    // ================== Slider Handlers ==================
      const openAddSlider = () => {
        setIsEditSlider(false);
        setEditingSliderId(null);
        setSliderForm({ title: "", status: 0, image: null });
        setShowSliderModal(true);
      };
    
      const openEditSlider = (row) => {
        setIsEditSlider(true);
        setEditingSliderId(row.id);
        setSliderForm({
          title: row.title || "",
          status: Number(row.status ?? 0),
          image: null,
        });
        setShowSliderModal(true);
      };
    
      const saveSlider = async () => {
        const fd = new FormData();
        fd.append("custom_page_id", page_id);
        fd.append("title", sliderForm.title);
        fd.append("status", String(sliderForm.status));
        if (sliderForm.image instanceof File) fd.append("image", sliderForm.image);
    
        try {
          if (isEditSlider && editingSliderId) {
            await updateHomeSlider(editingSliderId, fd);
          } else {
            await createHomeSlider(fd);
          }
          setShowSliderModal(false);
          await loadSlider();
        } catch (e) {
          // silent
        }
      };
    
      const removeSlider = async (id) => {
        if (!confirm("Delete this slider?")) return;
        try {
          await deleteHomeSlider(id);
          await loadSlider();
        } catch (e) {}
      };

      const saveSection1 = async () => {
          if (!sec1?.id) return;
      
          const fd = new FormData();
          fd.append("custom_page_id", page_id);
          fd.append("title", sec1Form.title);
          fd.append("description", sec1Form.description);
          fd.append("status", String(sec1Form.status));
          if (sec1Form.image instanceof File) fd.append("image", sec1Form.image);
      
          try {
            await updateSection3(sec1.id, fd);
            await loadSections();
            alert("Section 3 updated");
          } catch (e) {}
        };

  return (
    <>
    <Row className="g-3">
        <Col md={10}>
            <Form.Group className="mb-3">
                <Form.Control
                    placeholder='Page Title'
                    value={sec1Form.title}
                    onChange={(e) => setSec1Form((p) => ({ ...p, title: e.target.value }))}
                />
            </Form.Group>
        </Col>
        <Col md={2}>
            <Button onClick={saveSection1}>Update Title</Button>
        </Col>
    </Row>

    <div className="d-flex justify-content-between w-100 align-items-end mb-3">
        <Button onClick={openAddSlider}>+ Add Data</Button>
    </div>

    <div className="table-responsive">
        <Table bordered hover>
            <thead>
            <tr>
                <th style={{ width: 70 }}>ID</th>
                <th>Title</th>
                <th style={{ width: 160 }}>Image</th>
                <th style={{ width: 90 }}>Status</th>
                <th style={{ width: 160 }}>Action</th>
            </tr>
            </thead>
            <tbody>
            {sliderList?.length ? (
                sliderList.map((s) => (
                <tr key={s.id}>
                    <td>{s.id}</td>
                    <td>{s.title}</td>
                    <td>
                        {s.image ? (
                            <img
                                src={`${imageUrl}${s.image}`}
                                alt="slider"
                                className='admin-table-image p-2 rounded-xl'
                                style={{ width: 80, height: "auto", borderRadius: 8 }}
                            />
                        ) : (
                            "-"
                        )}
                    </td>
                    <td>{Number(s.status) === 0 ? "Show" : "Hide"}</td>
                    <td>
                    <Button size="sm" variant="secondary" onClick={() => openEditSlider(s)}>
                        Edit
                    </Button>{" "}
                    <Button size="sm" variant="danger" onClick={() => removeSlider(s.id)}>
                        Delete
                    </Button>
                    </td>
                </tr>
                ))
            ) : (
                <tr>
                <td colSpan={5} className="text-center">
                    {sliderLoading ? "Loading..." : "No slider found"}
                </td>
                </tr>
            )}
            </tbody>
        </Table>
    </div>

    {/* Slider Modal */}
    <Modal show={showSliderModal} onHide={() => setShowSliderModal(false)} centered>
        <Modal.Header closeButton>
            <Modal.Title>{isEditSlider ? "Edit Slider" : "Add Slider"}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
            <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
                value={sliderForm.title}
                onChange={(e) => setSliderForm((p) => ({ ...p, title: e.target.value }))}
                placeholder="Title"
            />
            </Form.Group>

            <Form.Group className="mb-3">
            <Form.Label>Status</Form.Label>
            <Form.Select
                value={sliderForm.status}
                onChange={(e) => setSliderForm((p) => ({ ...p, status: Number(e.target.value) }))}
            >
                <option value={0}>Show (0)</option>
                <option value={1}>Hide (1)</option>
            </Form.Select>
            </Form.Group>

            <Form.Group className="mb-2">
            <Form.Label>Image</Form.Label>
            <Form.Control
                type="file"
                accept="image/*"
                onChange={(e) => setSliderForm((p) => ({ ...p, image: e.target.files?.[0] || null }))}
            />
            </Form.Group>
        </Modal.Body>

        <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowSliderModal(false)}>
            Cancel
            </Button>
            <Button onClick={saveSlider}>Save</Button>
        </Modal.Footer>
    </Modal>
    </>
  )
}

export default CustomPageSectionThree