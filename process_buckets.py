from database.db import DBConnection

class ProcessBuckets():
    def __init__(self, buckets = []) -> None:
        self.buckets = buckets

    def read_buckets(self, buckets):
        self.buckets = buckets

    def add_bucket(self, bucket): 
        self.buckets.append(bucket)

    def clear_buckets(self):
        self.buckets.clear()

    def print_buckets(self):
        print(self.buckets)

    def retrieve_db_buckets(self, user_id):
        with DBConnection() as db_conn:
            if db_conn:
                sql_statement = """
                    SELECT BucketID, BucketName FROM Bucket WHERE UserID = %s;
                """
                db_conn.execute(sql_statement, (user_id,))
                db_buckets = db_conn.fetchall()

                self.buckets = [
                    {
                        'bucketID': bucket['BucketID'],
                        'bucketName': bucket['BucketName']
                    } for bucket in db_buckets
                ]

    def sync_buckets(self, user_id):
        with DBConnection() as db_conn:
            if db_conn:
                sql_statement = """
                    INSERT IGNORE INTO Bucket (BucketName, UserID) VALUES (%s, %s);
                """
                for bucket in self.buckets:
                    db_conn.execute(sql_statement, (bucket['bucketName'], user_id))

