import argparse
import os


parser = argparse.ArgumentParser(description='Creating elements with BEM')
parser.add_argument('Element', type=str, help='Name of element with dir (ex. blocks/blocks.scss)')
parser.add_argument('Target', type=str, help='Target page')
args = parser.parse_args()


dir_list = args.Element.split('.')[0].split("__")
"""
if len(dir_list) > 1:
    element = dir_list[1].split('--')[0]
    #modificator = dir_list[1].split('--')[1]
    path = 'blocks/'+dir_list[0]+'/__'+element+'/'
else:
    element = dir_list[0].split('--')[0]
    path = 'blocks/'+element+'/'
"""
# if want to create scss element
if args.Element.split('.')[1][:1] == 's':
    depends_file = open('src/styles/'+args.Target, 'a')
    depends_file.write('\n@import "'+args.Element.split('.')[0]+'";')
    depends_file.close()
    #args.Element.split('/')[:]
    #os.mknod('src/'+args.Element)
    try:
        os.makedirs('src/styles/'+os.path.dirname(args.Element))
    except FileExistsError:
        pass
    new_file = open('src/styles/'+args.Element, 'a')
    new_file.close()
# we want to create js element
elif args.Element.split('.')[1][:1] == 'j':
    try:
        os.makedirs('src/js/'+os.path.dirname(args.Element))
    except FileExistsError:
        pass
    new_file = open('src/js/'+args.Element, 'a')
    new_file.close()

print("Created "+args.Element)
