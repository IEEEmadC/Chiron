#filename = open("newfile.txt", "w")
import json
import urllib
import urllib2

meds = []
salts = []

mednames = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f','g',
'h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','A',
'B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U',
'V','W','X','Y','Z']

for a in mednames:
	url = "http://www.truemd.in/api/medicine_suggestions/?limit=2000&id="+a+"&key=19672e3aa4204c3de62095597d5947"
	req = urllib2.Request(url, headers={'User-Agent' : "Magic Browser"})
	con = urllib2.urlopen( req )
	json_object = json.loads(con.read())
	temparr = json_object['response']['suggestions']
	for b in temparr:
		tempval = b.get('suggestion')
		if tempval not in meds:
			meds.append(tempval)


for c in meds:
	d = urllib.quote(c)
	url = "http://www.truemd.in/api/medicine_details/?id="+d+"&key=19672e3aa4204c3de62095597d5947"
	req = urllib2.Request(url, headers={'User-Agent' : "Magic Browser"})
	con = urllib2.urlopen( req )
	json_object = json.loads(con.read())
	temparr = json_object['response']['constituents']
	for b in temparr:
		tempval = b.get('name')
		if tempval not in salts:
			salts.append(tempval)

print "Med names: "
print meds
print "Salt names: "
print salts
