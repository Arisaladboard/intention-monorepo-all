
class ProcessContacts():
    def __init__(self, contacts = []) -> None:
        self.contacts = contacts

    def read_contacts(self, contacts):
        self.contacts = contacts


    def clear_contacts(self):
        self.contacts.clear()

    def print_contacts(self):
        print(self.contacts)
