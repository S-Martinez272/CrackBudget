import React, { useState } from "react";

function RowanResources() {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  const sections = [
    {
      title: "First Year Residence Halls",
      items: [
        { name: "Mimosa Hall", link: "https://sites.rowan.edu/housing/housing-options/residence_halls/mimosa.html" },
        { name: "Evergreen Hall", link: "https://sites.rowan.edu/housing/housing-options/residence_halls/evergreen-hall-description.html" },
        { name: "Mullica Hall", link: "https://sites.rowan.edu/housing/housing-options/residence_halls/mullica.html" },
        { name: "Chestnut Hall", link: "https://sites.rowan.edu/housing/housing-options/residence_halls/chestnut.html" },
        { name: "Magnolia Hall", link: "https://sites.rowan.edu/housing/housing-options/residence_halls/magnolia.html" },
        { name: "Willow Hall", link: "https://sites.rowan.edu/housing/housing-options/residence_halls/willow.html" },
        { name: "Holly Pointe Commons", link: "https://sites.rowan.edu/housing/housing-options/residence_halls/holly_pointe.html" },
      ],
    },

    {
      title: "Upperclass Apartments",
      items: [
        { name: "EdgeWood Park", link: "https://sites.rowan.edu/housing/housing-options/apartments/edgewood_park.html" },
        { name: "Rowan Blvd.", link: "https://sites.rowan.edu/housing/housing-options/apartments/rowan_blvd_apartments.html" },
        { name: "Townhouses", link: "https://sites.rowan.edu/housing/housing-options/apartments/townhouse_complex.html" },
        { name: "The Whitney Center", link: "https://sites.rowan.edu/housing/housing-options/apartments/whitney_center.html "},
      ],
    },

        {
      title: "Upperclass Affiliated Student Housing",
      items: [
        { name: "220 Rowan Blvd.", link: "https://www.nexusglassboro.com/220-rowan-boulevard" },
        { name: "230 Victoria", link: "https://www.nexusglassboro.com/about-a3-student" },
        { name: "223 West High", link: "https://www.nexusglassboro.com/about-a3c-students" },
        { name: "57 North Main", link: "https://www.nexusglassboro.com/57-north-main"},
        { name: "114 Victoria", link: "https://www.nexusglassboro.com/114-victoria"},
      ],
    },
  ];

  return (
    <div className="chart-card">
      <div className="chart-header">
        <h2>Rowan Resources</h2>
        <span>Campus Housing</span>
      </div>

      <div className="chart-labels">
        {sections.map((section, index) => (
          <div key={index} className="dropdown-section">
            
            {/* Section Header */}
            <div
              className="dropdown-header"
              onClick={() => toggleSection(index)}
              style={{ cursor: "pointer", fontWeight: "bold" }}
            >
              {section.title}
            </div>

            {/* Dropdown Content */}
            {openSection === index && (
              <div className="dropdown-content">
                {section.items.map((item, i) => (
                  <div className="chart-label-item" key={i}>
                    <div className="label-left">
                      <span>{item.name}</span>
                    </div>
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Visit
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default RowanResources;
