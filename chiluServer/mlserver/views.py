from django.http import JsonResponse
import cv2
import numpy as np
import json
from django.views.decorators.csrf import csrf_exempt
from PIL import Image
import io
import _pickle as cPickle

# from tensorflow.python.keras.backend import set_session
# from tensorflow.keras.models import load_model
# import tensorflow as tf
# sess = tf.Session(config=tf.compat.v1.get_default_session())
# graph = tf.get_default_graph()
# set_session(sess)
# model = load_model('QuickDraw.h5')

SKETCHS = []
MODEL = ''
with open('sketch.list', 'r') as filehandle:
    for listitem in filehandle:
        SKETCHS.append(listitem[:-1])

with open('sketch.pkl', 'rb') as fid:
    MODEL = cPickle.load(fid)


# def keras_predict(model, image):
#     processed = keras_process_image(image)
#     print("processed: " + str(processed.shape))
#     pred_probab = 0
#     global sess
#     global graph
#     with graph.as_default():
#         set_session(sess)
#         pred_probab = model.predict(processed)[0]
#     pred_class = list(pred_probab)
#     sorted_list = np.sort(pred_probab)
#     return {'probability': str(max(pred_probab)), 'class': str(pred_class.index(max(pred_probab))), 'secondClass': str(pred_class.index(sorted_list[-2]))}


# def keras_process_image(img):
#     image_x = 28
#     image_y = 28
#     img = np.array(img, dtype=np.float32)
#     img = np.reshape(img, (-1, image_x, image_y, 1))
#     print(img.shape)
#     return img


@csrf_exempt
def requestApi(request):
    print("he there!")
    form = request.POST
    files = request.FILES

    img = Image.open(io.BytesIO(files['image'].read()))
    img = img.resize((256, 256))
    img = np.array(img)
    # print(img.shape)
    # cv2.imshow("dsds", img[:, :, 0])
    # cv2.waitKey(0)
    img = img[:, :, 0].reshape((1, 65536))

    arr = MODEL.predict_proba(img)
    i_arr = arr[0].argsort()[-3:][::-1]
    three = []
    for i in i_arr:
        print(SKETCHS[i])
        three.append(SKETCHS[i])

    return JsonResponse({'first': three[0], 'second': three[1], 'third': three[2]})


def index(request):
    # response_data = keras_predict(model, cv2.imread('sketch.png'))
    # print(response_data)
    return JsonResponse({"oye": "helloworld"})
