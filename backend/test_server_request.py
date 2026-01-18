
import requests
import json

def test_search():
    url = "http://localhost:8000/search"
    payload = {"query": "i have back pains and a maximum of 200 dollars"}
    headers = {"Content-Type": "application/json"}
    
    print(f"Sending POST to {url}...")
    try:
        response = requests.post(url, json=payload, headers=headers)
        print(f"Status Code: {response.status_code}")
        print("Response Body:")
        try:
            print(json.dumps(response.json(), indent=2))
        except:
            print(response.text)
            
    except Exception as e:
        print(f"Request failed: {e}")

if __name__ == "__main__":
    test_search()
