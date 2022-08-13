import React, { useState, useEffect } from "react";
import axios from "axios";

const IdentifiedMessages = () => {
  const [identifiedMessages, setIdentifiedMessages] = useState([]);

  useEffect(() => {
    getIdentifiedMessages();
  }, []);
  const getIdentifiedMessages = async () => {
    await axios.get("http://localhost:3001/admin/identified").then((res) => {
      if (res.status === 200) {
        setIdentifiedMessages(res.data);
      }
    });
  };
  return identifiedMessages.map((item, index) => {
    return (
      <div
        className="accordion accordion-flush"
        id="accordionFlushExample"
        key={index}
      >
        <div className="accordion-item">
          <h2 className="accordion-header" id="flush-headingOne">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseOne"
              aria-expanded="false"
              aria-controls="flush-collapseOne"
            >
              {item.identifier}
            </button>
          </h2>
          <div
            id="flush-collapseOne"
            className="accordion-collapse collapse"
            aria-labelledby="flush-headingOne"
            data-bs-parent="#accordionFlushExample"
          >
            <div className="accordion-body">
              <span class="badge text-bg-info">{item.subject}</span>
              {"\n"}
              {item.description}
            </div>
          </div>
        </div>
      </div>
    );
  });
};

export default IdentifiedMessages;
