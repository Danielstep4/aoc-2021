import os.path


def file_reader(dir_name: str, is_demo=False):

    path = os.path.join(
        dir_name, f"{'input/demo.txt' if is_demo else 'input/input.txt'}")
    f = open(path, 'r').read()
    return f.split('\n')


if __name__ == "__main__":
    pass
