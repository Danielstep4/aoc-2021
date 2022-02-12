from reader.file_Reader import file_reader
import os

__dirname__ = os.path.dirname(__file__)

demo_input = file_reader(__dirname__, is_demo=True)
input = file_reader(__dirname__)

solution = ""

# print(solution)
