let contacts = [];

function addContact(event) {
  event.preventDefault();
  let form = event.target;

  let contact = {
    id: generateId(),
    name: form.name.value,
    phone: form.phone.value,
    emergencyContact: form.emergencyContact.checked,
  };
  contacts.push(contact);
  saveContacts();
  form.reset();
}

function saveContacts() {
  window.localStorage.setItem("contacts", JSON.stringify(contacts));
  drawContacts();
}

function loadContacts() {
  let contactsData = JSON.parse(window.localStorage.getItem("contacts"));
  if (contactsData) {
    contacts = contactsData;
  }
}

function drawContacts() {
  let template = "";
  contacts.forEach((contact) => {
    template += `
      <div class="contact-card ${
        contact.emergencyContact ? "emergency-contact" : ""
      }">
        <h3>${contact.name}</h3>
        <p>${contact.phone}</p>
        <button type="button" onclick="removeContact('${
          contact.id
        }')">remove</button>      
      </div>
    `;
  });

  document.getElementById("contact-list").innerHTML = template;
}

function removeContact(contactId) {
  let index = contacts.findIndex((contact) => contact.id == contactId);
  if (index == -1) {
    throw new Error("Invalid Contact ID");
  }
  contacts.splice(index, 1);
  saveContacts();
}

function toggleAddContactForm() {
  document.getElementById("new-contact-form").classList.toggle("hidden");
}

function generateId() {
  return (
    Math.floor(Math.random() * 10000000) +
    "-" +
    Math.floor(Math.random() * 10000000)
  );
}

loadContacts();
drawContacts();
