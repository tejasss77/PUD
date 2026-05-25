import re
import math
import tldextract
from urllib.parse import urlparse
from collections import Counter

class FeatureExtractor:
    def __init__(self):
        self.shortening_services = r"bit\.ly|goo\.gl|shorte\.st|go2l\.ink|x\.co|ow\.ly|t\.co|tinyurl|tr\.im|is\.gd|cli\.gs|" \
                                    r"yfrog\.com|migre\.me|ff\.im|tiny\.cc|url4\.eu|twit\.ac|su\.pr|twurl\.nl|snipurl\.com|" \
                                    r"short\.to|BudURL\.com|ping\.fm|post\.ly|Just\.as|bkite\.com|snipr\.com|fic\.kr|loopt\.us|" \
                                    r"doiop\.com|short\.ie|kl\.am|wp\.me|rubyurl\.com|om\.ly|to\.ly|bit\.do|t\.me"

    def get_entropy(self, text):
        if not text:
            return 0
        probabilities = [n_x / len(text) for n_x in Counter(text).values()]
        return -sum(p * math.log2(p) for p in probabilities)

    def extract_features(self, url):
        # Ensure URL has a scheme for parsing
        if not re.match(r'^https?://', url):
            url = 'http://' + url
            
        parsed_url = urlparse(url)
        extracted = tldextract.extract(url)
        
        domain = extracted.domain + '.' + extracted.suffix
        subdomain = extracted.subdomain
        path = parsed_url.path
        query = parsed_url.query
        
        features = {}
        
        # Lexical Features
        features['url_length'] = len(url)
        features['num_dots'] = url.count('.')
        features['num_hyphens'] = url.count('-')
        features['num_underscores'] = url.count('_')
        features['num_slashes'] = url.count('/')
        features['num_subdomains'] = subdomain.count('.') + 1 if subdomain else 0
        
        # IP Address check
        ip_pattern = r'(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])'
        features['has_ip_address'] = 1 if re.search(ip_pattern, url) else 0
        
        features['has_at_symbol'] = 1 if '@' in url else 0
        features['has_double_slash'] = 1 if url.rfind('//') > 7 else 0
        features['entropy'] = self.get_entropy(url)
        
        digits = re.findall(r'\d', url)
        features['digit_ratio'] = len(digits) / len(url) if len(url) > 0 else 0
        
        special_chars = re.findall(r'[%=\?&\-._~]', url)
        features['special_char_count'] = len(special_chars)
        
        # Domain Features
        features['domain_length'] = len(domain)
        features['is_https'] = 1 if parsed_url.scheme == 'https' else 0
        features['is_shortened'] = 1 if re.search(self.shortening_services, url) else 0
        
        # Path/Query Features
        features['path_depth'] = path.count('/')
        features['has_redirect'] = 1 if 'redirect=' in query.lower() or 'url=' in query.lower() else 0
        features['query_length'] = len(query)
        
        # Note: domain_age_days requires external lookup, will be added in prediction service
        # For training, we might need a pre-collected dataset or mock value
        
        return features

# Example usage:
# extractor = FeatureExtractor()
# print(extractor.extract_features("https://www.google.com/search?q=test"))
