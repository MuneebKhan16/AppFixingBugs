import React, {useRef, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import * as ImageCropPicker from 'react-native-image-crop-picker';
import {
  Image as ImageCompressor,
  Video as VideoCompressor,
} from 'react-native-compressor';
import ActionSheet from 'react-native-actions-sheet';

const CustomImagePicker = ({
  children,
  onImageChange = () => {},
  uploadVideo = false,
  isMultiple = true,
  style,
}) => {
  const actionSheetRef = useRef(null);
  const [videoPath, setVideoPath] = useState(null);
  const imageChange = method => {
    if (method === 'camera') {
      ImageCropPicker.openCamera({
        mediaType: 'any',
      }).then(async image => {
        actionSheetRef.current.hide();
        // Perform additional operations on the image if needed
        const result = await ImageCompressor.compress(image.path, {
          maxHeight: 400,
          maxWidth: 400,
          quality: 1,
        });
        onImageChange(result, image.mime, 'any');
      });
    } else if (method === 'gallery') {
      ImageCropPicker.openPicker({
        multiple: isMultiple,
        mediaType: 'photo',
      }).then(async image => {
        actionSheetRef.current.hide();
        // Perform additional operations on the image if needed
        if (isMultiple) {
          onImageChange(image, 'image/');
        } else {
          const result = await ImageCompressor.compress(image.path, {
            maxHeight: 400,
            maxWidth: 400,
            quality: 1,
          });
          onImageChange(result, image.mime, 'photo');
        }
      });
    } else if (method === 'video') {
      ImageCropPicker.openPicker({
        mediaType: 'video',
      }).then(async video => {
        actionSheetRef.current.hide();
        // Perform additional operations on the video if needed
        const result = await VideoCompressor.compress(video.path, {
          compressionMethod: 'auto',
        });
        onImageChange(result, video.mime, 'video');
      });
    }
  };

  return (
    <TouchableOpacity
      onPress={() => actionSheetRef.current.show()}
      style={style}>
      <ActionSheet
        ref={actionSheetRef}
        containerStyle={{backgroundColor: 'white'}}>
        <View style={{padding: 10}}>
          <View
            style={{
              backgroundColor: 'rgba(241,241,241,0.8)',
              borderRadius: 10,
              marginBottom: 10,
            }}>
            <View
              style={{
                borderBottomWidth: 1.5,
                borderBottomColor: '#ccc',
                paddingVertical: 10,
              }}>
              <Text style={{color: 'grey', textAlign: 'center'}}>
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
              }}>
              <Text style={{color: 'rgb(0,88,200)', fontSize: 18}}>
                Take Photo
              </Text>
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
              }}>
              <Text style={{color: 'rgb(0,88,200)', fontSize: 18}}>
                Choose from Library
              </Text>
            </TouchableOpacity>
            {uploadVideo && (
              <TouchableOpacity
                onPress={() => {
                  imageChange('video');
                }}
                style={{paddingVertical: 12, alignItems: 'center'}}>
                <Text style={{color: 'rgb(0,88,200)', fontSize: 18}}>
                  Upload A Video
                </Text>
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
            }}>
            <Text
              style={{
                color: 'rgb(0,88,200)',
                fontSize: 18,
                fontWeight: '600',
              }}>
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
