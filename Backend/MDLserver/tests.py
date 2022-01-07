from django.test import TestCase, Client
import unittest
import requests
import json
# Create your tests here.

# Series

#NO FUNCIONA DEBIDO AL CAMBIO DE API

# class Social_Series_Content_Link_Test_Correct(unittest.TestCase):
#     def setUp(self):
#         # Every test needs a client.
#         self.client = Client()

#     def test_details(self):
#         # Issue a GET request.
#         response = self.client.get('http://127.0.0.1:8000/video/get-by-id?source_id=tt3398228&source=imdb')

#         # Check that the response is 200 OK.
#         self.assertEqual(response.status_code, 200)
#         self.assertEqual('https://www.netflix.com/title/80125588' in str(response.json()), True)

# class Social_Series_Content_Link_Test_Error(unittest.TestCase):
#     def setUp(self):
#         # Every test needs a client.
#         self.client = Client()

#     def test_details(self):
#         # Issue a GET request.
#         response = self.client.get('http://127.0.0.1:8000/video/get-by-id?source_id=tt3398228&source=imdb')

#         # Check that the response is 200 OK.
#         self.assertEqual(response.status_code, 200)
#         self.assertEqual('https://www.netflix.com/title/80125589' in str(response.json()), False)


# Films


#NO FUNCIONA DEBIDO AL CAMBIO DE API

# class Social_Films_Content_Link_Test_Correct(unittest.TestCase):
#     def setUp(self):
#         # Every test needs a client.
#         self.client = Client()

#     def test_details(self):
#         # Issue a GET request.
#         response = self.client.get('http://127.0.0.1:8000/video/get-by-id?source_id=tt2250912&source=imdb')

#         # Check that the response is 200 OK.
#         self.assertEqual(response.status_code, 200)
#         self.assertEqual('https://www.netflix.com/title/80166369' in str(response.json()), True)

# class Social_Films_Content_Link_Test_Error(unittest.TestCase):
#     def setUp(self):
#         # Every test needs a client.
#         self.client = Client()

#     def test_details(self):
#         # Issue a GET request.
#         response = self.client.get('http://127.0.0.1:8000/video/get-by-id?source_id=tt2250912&source=imdb')

#         # Check that the response is 200 OK.
#         self.assertEqual(response.status_code, 200)
#         self.assertEqual('https://www.netflix.com/title/80166370' in str(response.json()), False)

# Songs

class Social_Songs_Content_Link_Test_Correct(unittest.TestCase):
    def setUp(self):
        # Every test needs a client.
        self.client = Client()

    def test_details(self):
        # Issue a GET request.
        self.client.get('http://127.0.0.1:8000/spotify/is-auth?user_id=44')
        response = self.client.get('http://127.0.0.1:8000/spotify/search?query=ateo&type=track&user=44')

        # Check that the response is 200 OK.
        self.assertEqual(response.status_code, 200)
        self.assertEqual('https://open.spotify.com/album/6Re7sviVustR53KeArspwK' in str(response.json()), True)

class Social_Songs_Content_Link_Test_Error(unittest.TestCase):
    def setUp(self):
        # Every test needs a client.
        self.client = Client()

    def test_details(self):
        # Issue a GET request.
        self.client.get('http://127.0.0.1:8000/spotify/is-auth?user_id=44')
        response = self.client.get('http://127.0.0.1:8000/spotify/search?query=ateo&type=track&user=44')

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
        response = self.client.get('http://127.0.0.1:8000/api/get-user?user_id=44')

        # Check that the response is 200 OK.
        self.assertEqual(response.status_code, 200)
        self.assertEqual('MultilistPremium' in str(response.json()), True)
        self.assertEqual('multilistpremium@multilist.com' in str(response.json()), True)

class User_View_User_Profile_Test_Error(unittest.TestCase):
    def setUp(self):
        # Every test needs a client.
        self.client = Client()

    def test_details(self):
        # Issue a GET request.
        response = self.client.get('http://127.0.0.1:8000/api/get-user?user_id=44')

        # Check that the response is 200 OK.
        self.assertEqual(response.status_code, 200)
        self.assertEqual('Jondoe' in str(response.json()), False)
        self.assertEqual('Jondoe@gmail.com' in str(response.json()), False)

class User_View_User_Follows_Test_Correct(unittest.TestCase):
    def setUp(self):
        # Every test needs a client.
        self.client = Client()

    def test_details(self):
        # Issue a GET request.
        body = {'list': json.dumps(["44", "54"])}
        response = self.client.post('http://127.0.0.1:8000/api/get-user-array', body)
        
        # Check that the response is 200 OK.
        self.assertEqual(response.status_code, 200)
        self.assertEqual('MultilistPremium' in str(response.json()), True)
        self.assertEqual('admin' in str(response.json()), True)

class User_View_User_Follows_Test_Error(unittest.TestCase):
    def setUp(self):
        # Every test needs a client.
        self.client = Client()

    def test_details(self):
        # Issue a GET request.
        body = {'list': json.dumps(["44", "54"])}
        response = self.client.post('http://127.0.0.1:8000/api/get-user-array', body)

        # Check that the response is 200 OK.
        self.assertEqual(response.status_code, 200)
        self.assertEqual('Jondoe' in str(response.json()), False)
        self.assertEqual('Juanjo' in str(response.json()), False)

# Valoración

class User_View_Get_Content_Comments_Test_Correct(unittest.TestCase):
    def setUp(self):
        # Every test needs a client.
        self.client = Client()

    def test_details(self):
        # Issue a GET request.
        response = self.client.get('http://127.0.0.1:8000/api/get-content-comments?id=557')
        # Check that the response is 200 OK.
        self.assertEqual(response.status_code, 200)
        self.assertTrue("557" in str(response.json()))

class User_View_Get_Content_Comments_Test_Error(unittest.TestCase):
    def setUp(self):
        # Every test needs a client.
        self.client = Client()

    def test_details(self):
        # Issue a GET request.
        response = self.client.get('http://127.0.0.1:8000/api/get-content-comments?id=557')
        # Check that the response is 200 OK.
        self.assertEqual(response.status_code, 200)
        self.assertFalse("558" in str(response.json()))

class User_View_Get_Content_Comments_Test_Empty(unittest.TestCase):
    def setUp(self):
        # Every test needs a client.
        self.client = Client()

    def test_details(self):
        # Issue a GET request.
        response = self.client.get('http://127.0.0.1:8000/api/get-content-comments?id=7')
        # Check that the response is 200 OK.
        self.assertEqual(response.status_code, 200)
        self.assertEqual("[]", str(response.json()))

#Non Functional

class Content_Response_Time_Test(unittest.TestCase):
    def test_details(self):
        #Check that response time is less than 1 second
        time = requests.get("http://127.0.0.1:8000/video/get-show?query=bojack&page=1").elapsed.total_seconds()
        self.assertLess(time, 1)
