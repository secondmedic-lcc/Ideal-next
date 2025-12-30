"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Button, Container, Form, Modal, Table, Tabs, Tab, Row, Col } from "react-bootstrap";
import parse from "html-react-parser";
import { useParams, useRouter } from "next/navigation";

import {
  listHomeSlider,
  createHomeSlider,
  updateHomeSlider,
  deleteHomeSlider,
  getSection1,
  updateSection1,
  getSection2,
  updateSection2,
} from "@/services/admin/customPageSectionsServices";

import { imageUrl } from "@/services/baseUrl";
import CustomPageSectionThree from "./CustomPageSectionThree";

const CustomPageSectionsComponent = ({page_id}) => {

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

  // ================== Section 1 State ==================
  const [sec1, setSec1] = useState(null);
  const [sec1Form, setSec1Form] = useState({
    title: "",
    description: "",
    status: 0,
    image: null,
  });

  // ================== Section 2 State ==================
  const [sec2, setSec2] = useState(null);
  const [sec2Form, setSec2Form] = useState({
    title: "",
    description: "",
    status: 0,
    image: null,
  });

  // ================== Load All ==================
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
      const s1 = await getSection1(page_id);
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

    try {
      const s2 = await getSection2(page_id);
      const row2 = s2?.data?.row || null;
      setSec2(row2);
      if (row2) {
        setSec2Form({
          title: row2.title || "",
          description: row2.description || "",
          status: Number(row2.status ?? 0),
          image: null,
        });
      }
    } catch (e) {
      setSec2(null);
    }
  };

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

  // ================== Section Save ==================
  const saveSection1 = async () => {
    if (!sec1?.id) return;

    const fd = new FormData();
    fd.append("custom_page_id", page_id);
    fd.append("title", sec1Form.title);
    fd.append("description", sec1Form.description);
    fd.append("status", String(sec1Form.status));
    if (sec1Form.image instanceof File) fd.append("image", sec1Form.image);

    try {
      await updateSection1(sec1.id, fd);
      await loadSections();
      alert("Section 1 updated");
    } catch (e) {}
  };

  const saveSection2 = async () => {
    if (!sec2?.id) return;

    const fd = new FormData();
    fd.append("custom_page_id", page_id);
    fd.append("title", sec2Form.title);
    fd.append("description", sec2Form.description);
    fd.append("status", String(sec2Form.status));
    if (sec2Form.image instanceof File) fd.append("image", sec2Form.image);

    try {
      await updateSection2(sec2.id, fd);
      await loadSections();
      alert("Section 2 updated");
    } catch (e) {}
  };

  return (
    <Container className="py-4">
      {/* <h3 className="mb-3">Home Page Admin</h3> */}

      <Tabs defaultActiveKey="slider" className="mb-3">
        {/* ================= Slider Tab ================= */}
        <Tab eventKey="slider" title="Slider CRUD">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <Button onClick={openAddSlider}>+ Add Slider</Button>
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
                            style={{ width: 140, height: "auto", borderRadius: 8 }}
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
                  placeholder="Slider Title"
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
        </Tab>

        {/* ================= Section 1 ================= */}
        <Tab eventKey="sec1" title="Section 1 Update">
          {!sec1 ? (
            <div>Section 1 row not found (check DB page_name)</div>
          ) : (
            <Row className="g-3">
              <Col md={8}>
                <Form.Group className="mb-3">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    value={sec1Form.title}
                    onChange={(e) => setSec1Form((p) => ({ ...p, title: e.target.value }))}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Description (HTML ok)</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={8}
                    value={sec1Form.description}
                    onChange={(e) => setSec1Form((p) => ({ ...p, description: e.target.value }))}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Status</Form.Label>
                  <Form.Select
                    value={sec1Form.status}
                    onChange={(e) => setSec1Form((p) => ({ ...p, status: Number(e.target.value) }))}
                  >
                    <option value={0}>Show (0)</option>
                    <option value={1}>Hide (1)</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Image</Form.Label>
                  <Form.Control
                    type="file"
                    accept="image/*"
                    onChange={(e) => setSec1Form((p) => ({ ...p, image: e.target.files?.[0] || null }))}
                  />
                </Form.Group>

                <Button onClick={saveSection1}>Update Section 1</Button>
              </Col>

              <Col md={4}>
                <div className="mb-2"><strong>Current Image</strong></div>
                {sec1.image ? (
                  <img
                    src={`${imageUrl}${sec1.image}`}
                    alt="sec1"
                    style={{ width: "100%", height: "auto", borderRadius: 10 }}
                  />
                ) : (
                  <div>-</div>
                )}

                <hr />

                <div className="mb-2"><strong>Preview</strong></div>
                <div>{sec1Form.title ? parse(String(sec1Form.title)) : ""}</div>
                <div>{sec1Form.description ? parse(String(sec1Form.description)) : ""}</div>
              </Col>
            </Row>
          )}
        </Tab>

        {/* ================= Section 2 ================= */}
        <Tab eventKey="sec2" title="Section 2 Update">
          {!sec2 ? (
            <div>Section 2 row not found (check DB page_name)</div>
          ) : (
            <Row className="g-3">
              <Col md={8}>
                <Form.Group className="mb-3">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    value={sec2Form.title}
                    onChange={(e) => setSec2Form((p) => ({ ...p, title: e.target.value }))}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Description (HTML ok)</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={8}
                    value={sec2Form.description}
                    onChange={(e) => setSec2Form((p) => ({ ...p, description: e.target.value }))}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Status</Form.Label>
                  <Form.Select
                    value={sec2Form.status}
                    onChange={(e) => setSec2Form((p) => ({ ...p, status: Number(e.target.value) }))}
                  >
                    <option value={0}>Show (0)</option>
                    <option value={1}>Hide (1)</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Image</Form.Label>
                  <Form.Control
                    type="file"
                    accept="image/*"
                    onChange={(e) => setSec2Form((p) => ({ ...p, image: e.target.files?.[0] || null }))}
                  />
                </Form.Group>

                <Button onClick={saveSection2}>Update Section 2</Button>
              </Col>

              <Col md={4}>
                <div className="mb-2"><strong>Current Image</strong></div>
                {sec2.image ? (
                  <img
                    src={`${imageUrl}${sec2.image}`}
                    alt="sec2"
                    style={{ width: "100%", height: "auto", borderRadius: 10 }}
                  />
                ) : (
                  <div>-</div>
                )}

                <hr />

                <div className="mb-2"><strong>Preview</strong></div>
                <div>{sec2Form.title ? parse(String(sec2Form.title)) : ""}</div>
                <div>{sec2Form.description ? parse(String(sec2Form.description)) : ""}</div>
              </Col>
            </Row>
          )}
        </Tab>

        {/* ================= Section 3 ================= */}
        <Tab eventKey="sec3" title="Section 3 Update">
          <CustomPageSectionThree page_id={page_id} />
        </Tab>
      </Tabs>
    </Container>
  );
};

export default CustomPageSectionsComponent;