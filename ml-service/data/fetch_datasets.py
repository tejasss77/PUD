import requests
import pandas as pd
import os
import zipfile
import io

DATA_DIR = os.path.dirname(os.path.abspath(__file__))

def download_phishtank():
    print("Downloading PhishTank data...")
    # Using the public data link (verified_online.csv)
    url = "http://data.phishtank.com/data/online-valid.csv"
    try:
        response = requests.get(url)
        if response.status_code == 200:
            with open(os.path.join(DATA_DIR, "phishing_urls.csv"), "wb") as f:
                f.write(response.content)
            print("PhishTank data downloaded.")
        else:
            print(f"Failed to download PhishTank data: {response.status_code}")
    except Exception as e:
        print(f"Error downloading PhishTank: {e}")

def download_tranco():
    print("Downloading Tranco list...")
    # Latest Tranco list
    url = "https://tranco-list.eu/top-1m.csv.zip"
    try:
        response = requests.get(url)
        if response.status_code == 200:
            z = zipfile.ZipFile(io.BytesIO(response.content))
            z.extractall(DATA_DIR)
            # Rename extracted file to something consistent
            extracted_file = z.namelist()[0]
            os.rename(os.path.join(DATA_DIR, extracted_file), os.path.join(DATA_DIR, "legitimate_urls.csv"))
            print("Tranco data downloaded.")
        else:
            print(f"Failed to download Tranco list: {response.status_code}")
    except Exception as e:
        print(f"Error downloading Tranco: {e}")

if __name__ == "__main__":
    if not os.path.exists(DATA_DIR):
        os.makedirs(DATA_DIR)
    download_phishtank()
    download_tranco()
