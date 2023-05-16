import React, { useRef, useState } from 'react';
import { Text, TouchableOpacity, View, } from 'react-native';
import * as ImageCropPicker from 'react-native-image-crop-picker';
import Video from 'react-native-video';
import ActionSheet from 'react-native-actions-sheet';

const CustomImagePicker = ({
  children,
  onImageChange = () => { },
  uploadVideo = false,
  isMultiple = true,
  style,
}) => {
  const actionSheetRef = useRef(null);
  const [videoPath, setVideoPath] = useState(null);
  const imageChange = (method) => {
    if (method === 'camera') {
      ImageCropPicker.openCamera({
        mediaType: 'any',
      }).then(async (image) => {
        actionSheetRef.current.hide();
        // Perform additional operations on the image if needed
        onImageChange(image.path, image.mime, 'any');
      });
    } else if (method === 'gallery') {
      ImageCropPicker.openPicker({
        multiple: isMultiple,
        mediaType: 'any',
      }).then(async (image) => {
        actionSheetRef.current.hide();
        // Perform additional operations on the image if needed
        if (isMultiple) {
          onImageChange(image, 'image/')
        } else {
          // onImageChange(image.path, image.mime, 'photo');
          
        }
      });
    } else if (method === 'video') {

      ImageCropPicker.openPicker({
        multiple: isMultiple,
        mediaType: 'any',
      }).then(async (video) => {
        actionSheetRef.current.hide();
        if (isMultiple) {
          onImageChange(video, 'video/')
        } else {
          onImageChange(video.path, video.mime, 'video');

        }
        // Perform additional operations on the video if needed
      });
    }
  };

  return (
    <TouchableOpacity onPress={() => actionSheetRef.current.show()} style={style}>
      <ActionSheet ref={actionSheetRef} containerStyle={{ backgroundColor: 'white' }}>
        <View style={{ padding: 10 }}>
          <View
            style={{
              backgroundColor: 'rgba(241,241,241,0.8)',
              borderRadius: 10,
              marginBottom: 10,
            }}
          >
            <View
              style={{
                borderBottomWidth: 1.5,
                borderBottomColor: '#ccc',
                paddingVertical: 10,
              }}
            >
              <Text style={{ color: 'grey', textAlign: 'center' }}>
                Choose an option to pick an Image
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                imageChange('camera');
              }}
              style={{
                paddingVertical: 12,
                alignItems: 'center',
                borderBottomWidth: 1.5,
                borderBottomColor: '#ccc',
              }}
            >
              <Text style={{ color: 'rgb(0,88,200)', fontSize: 18 }}>Take Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                imageChange('gallery');
              }}
              style={{
                paddingVertical: 12,
                alignItems: 'center',
                borderBottomWidth: 1.5,
                borderBottomColor: '#ccc',
              }}
            >
              <Text style={{ color: 'rgb(0,88,200)', fontSize: 18 }}>Choose from Library</Text>
            </TouchableOpacity>
            {uploadVideo && (
              <TouchableOpacity
                onPress={() => {
                  imageChange('video');
                }}
                style={{ paddingVertical: 12, alignItems: 'center' }}
              >
                <Text style={{ color: 'rgb(0,88,200)', fontSize: 18 }}>Upload A Video</Text>
              </TouchableOpacity>
            )}
          </View>
          <TouchableOpacity
            onPress={() => actionSheetRef.current.hide()}
            style={{
              backgroundColor: 'rgba(241,241,241,0.8)',
              borderRadius: 10,
              paddingVertical: 12,
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                color: 'rgb(0,88,200)',
                fontSize: 18,
                fontWeight: '600',
              }}
            >
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
      </ActionSheet>
      {children}
    </TouchableOpacity>
  );
};

export default CustomImagePicker;
