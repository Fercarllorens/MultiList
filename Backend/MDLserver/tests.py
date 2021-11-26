from django.test import TestCase, Client
import unittest

# Create your tests here.

# Series

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

# Films

class Social_Films_Content_Link_Test_Correct(unittest.TestCase):
    def setUp(self):
        # Every test needs a client.
        self.client = Client()

    def test_details(self):
        # Issue a GET request.
        response = self.client.get('http://127.0.0.1:8000/video/get-by-id?source_id=tt2250912&source=imdb')

        # Check that the response is 200 OK.
        self.assertEqual(response.status_code, 200)
        self.assertEqual('https://www.netflix.com/title/80166369' in str(response.json()), True)

class Social_Films_Content_Link_Test_Error(unittest.TestCase):
    def setUp(self):
        # Every test needs a client.
        self.client = Client()

    def test_details(self):
        # Issue a GET request.
        response = self.client.get('http://127.0.0.1:8000/video/get-by-id?source_id=tt2250912&source=imdb')

        # Check that the response is 200 OK.
        self.assertEqual(response.status_code, 200)
        self.assertEqual('https://www.netflix.com/title/80166370' in str(response.json()), False)

# Songs

class Social_Songs_Content_Link_Test_Correct(unittest.TestCase):
    def setUp(self):
        # Every test needs a client.
        self.client = Client()

    def test_details(self):
        # Issue a GET request.
        self.client.get('http://127.0.0.1:8000/spotify/is-auth?user_id=11')
        response = self.client.get('http://127.0.0.1:8000/spotify/search?query=ateo&type=track&user=11')

        # Check that the response is 200 OK.
        self.assertEqual(response.status_code, 200)
        self.assertEqual('https://open.spotify.com/album/6Re7sviVustR53KeArspwK' in str(response.json()), True)

class Social_Songs_Content_Link_Test_Error(unittest.TestCase):
    def setUp(self):
        # Every test needs a client.
        self.client = Client()

    def test_details(self):
        # Issue a GET request.
        self.client.get('http://127.0.0.1:8000/spotify/is-auth?user_id=11')
        response = self.client.get('http://127.0.0.1:8000/spotify/search?query=ateo&type=track&user=11')

        # Check that the response is 200 OK.
        self.assertEqual(response.status_code, 200)
        self.assertEqual('https://open.spotify.com/album/6Re7sviVustR53KeArspwj' in str(response.json()), False)

# Usuarios

class User_View_User_Profile_Test_Correct(unittest.TestCase):
    def setUp(self):
        # Every test needs a client.
        self.client = Client()

    def test_details(self):
        # Issue a GET request.
        response = self.client.get('http://127.0.0.1:8000/api/get-user?user_id=11')

        # Check that the response is 200 OK.
        self.assertEqual(response.status_code, 200)
        self.assertEqual('admin' in str(response.json()), True)
        self.assertEqual('multilistapp@gmail.com' in str(response.json()), True)

class User_View_User_Profile_Test_Error(unittest.TestCase):
    def setUp(self):
        # Every test needs a client.
        self.client = Client()

    def test_details(self):
        # Issue a GET request.
        response = self.client.get('http://127.0.0.1:8000/api/get-user?user_id=11')

        # Check that the response is 200 OK.
        self.assertEqual(response.status_code, 200)
        self.assertEqual('Genis' in str(response.json()), True)
        self.assertEqual('multi@gmail.com' in str(response.json()), True)

class User_View_User_Follows_Test_Correct(unittest.TestCase):
    def setUp(self):
        # Every test needs a client.
        self.client = Client()

    def test_details(self):
        # Issue a GET request.
        response = self.client.post('http://127.0.0.1:8000/api/get-user-array', {'list': [11, 14]})

        # Check that the response is 200 OK.
        self.assertEqual(response.status_code, 200)
        self.assertEqual('admin' in str(response.json()), True)
        self.assertEqual('Test' in str(response.json()), True)

class User_View_User_Follows_Test_Error(unittest.TestCase):
    def setUp(self):
        # Every test needs a client.
        self.client = Client()

    def test_details(self):
        # Issue a GET request.
        response = self.client.post('http://127.0.0.1:8000/api/get-user-array', {'list': [11, 12]})

        # Check that the response is 200 OK.
        self.assertEqual(response.status_code, 200)
        self.assertEqual('admin' in str(response.json()), True)
        self.assertEqual('Test' in str(response.json()), True)
