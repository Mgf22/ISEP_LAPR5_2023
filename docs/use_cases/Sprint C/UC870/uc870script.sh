#!/bin/bash
cd /root/bin/mongodumptotal/
find -type d -mtime +7 -execdir rm -r -- '{}' \;