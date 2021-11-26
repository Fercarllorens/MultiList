from django.test import TestCase, Client
import unittest

# Create your tests here.

class Social_Series_Content_Link_Test_Correct(unittest.TestCase):
    def setUp(self):
        # Every test needs a client.
        self.client = Client()

    def test_details(self):
        # Issue a GET request.
        response = self.client.get('http://127.0.0.1:8000/video/get-by-id?source_id=tt3398228&source=imdb')

        # Check that the response is 200 OK.
        self.assertEqual(response.status_code, 200)
        self.assertEqual('https://www.netflix.com/title/80125588' in str(response.json()), True)

class Social_Series_Content_Link_Test_Error(unittest.TestCase):
    def setUp(self):
        # Every test needs a client.
        self.client = Client()

    def test_details(self):
        # Issue a GET request.
        response = self.client.get('http://127.0.0.1:8000/video/get-by-id?source_id=tt3398228&source=imdb')

        # Check that the response is 200 OK.
        self.assertEqual(response.status_code, 200)
        self.assertEqual('https://www.netflix.com/title/80125589' in str(response.json()), False)