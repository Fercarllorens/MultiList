from django.test import TestCase, client
import unittest

# Create your tests here.

class Social_Content_Link_Test(unittest.TestCase):
    def setUp(self):
        # Every test needs a client.
        self.client = client()

    def test_details(self):
        # Issue a GET request.
        response = self.client.get('http://127.0.0.1:8000/video/get-by-id?source_id=tt3398228&source=imdb')

        # Check that the response is 200 OK.
        self.assertEqual(response.status_code, 200)

        # Check that the rendered context contains 5 customers.
        self.assertEqual('https://www.netflix.com/title/80125588' in response.content, True)
        print('AAAAAAAAA')
