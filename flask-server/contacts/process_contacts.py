from database.db import DBConnection
class ProcessContacts():
    def __init__(self, contacts = []) -> None:
        self.local_contacts = contacts

    def read_contacts(self, contacts):
        self.local_contacts = contacts

    def add_contact(self, contact): 
        self.local_contacts.append(contact)


    def clear_contacts(self):
        self.local_contacts.clear()

    def print_contacts(self):
        print(self.local_contacts)

    def retrieve_db_contacts(self, user_id):
        with DBConnection() as db_conn:
            if db_conn:
                sql_statement = """
                    SELECT * FROM Contact WHERE UserID = %s;
                """
                db_conn.execute(sql_statement, (user_id,))
                self.db_contacts = db_conn.fetchall()
                print(f'Contacts for {user_id}: ')
                for contact in self.db_contacts:
                    print(contact)

    def sync_contacts(self):
        pass