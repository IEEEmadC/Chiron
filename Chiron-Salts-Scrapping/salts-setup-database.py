from saltsbase import *

import urllib
import requests

for saltname in salts:
    r = requests.post("https://chiron-backend.herokuapp.com/api/salt", data={'name': saltname})
