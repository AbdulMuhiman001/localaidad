import CloseIcon from "@/assets/images/close.svg";
import DeleteIcon from "@/assets/images/delete-bin-7-line.svg";
import RouteIcon from "@/assets/images/direction-line.svg";
import ScreenshotIcon from "@/assets/images/download-line.svg";
import CopyIcon from "@/assets/images/link.svg";
import ShareIcon from "@/assets/images/share-forward-box-fill.svg";
import { font } from "@/utils/constants";
import React from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface PostOptionsModalProps {
  visible: boolean;
  onClose: () => void;
  onDelete?: () => void;
}

const PostOptionsModal: React.FC<PostOptionsModalProps> = ({ visible, onClose, onDelete }) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.headerRow}>
            <Text style={styles.headerTitle}>Post Options</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <CloseIcon width={22} height={22} />
            </TouchableOpacity>
          </View>
          <View style={styles.divider} />

          {/* Options */}
          <TouchableOpacity style={styles.optionBtn}>
            <CopyIcon width={20} height={20} />
            <Text style={styles.optionText}>Copy Link</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionBtn}>
            <ShareIcon width={20} height={20} />
            <Text style={styles.optionText}>Share</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionBtn}>
            <ScreenshotIcon width={20} height={20} />
            <Text style={styles.optionText}>Screenshot</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionBtn}>
            <RouteIcon width={20} height={20} />
            <Text style={styles.optionText}>Route</Text>
          </TouchableOpacity>

          {/* Delete Option */}
          <TouchableOpacity style={styles.deleteBtn} onPress={onDelete}>
            <DeleteIcon width={20} height={20} />
            <Text style={styles.deleteText}>Delete Post</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.25)',
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 8,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
    position: 'relative',
  },
  headerTitle: {
    fontFamily: font.regular,
    fontSize: 17,
    color: '#222',
    letterSpacing: 0.2,
    textAlign: 'center',
    flex: 1,
  },
  closeBtn: {
    position: 'absolute',
    right: 0,
    top: -7,
    padding: 4,
  },
  divider: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginBottom: 8,
  },
  optionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E6E6E6',
    borderRadius: 14,
    paddingVertical: 14,
    marginBottom: 12,
    backgroundColor: '#fff',
    gap: 5,
  },
  optionText: {
    fontFamily: font.semiBold,
    fontSize: 16,
    color: '#222',
    textAlign: 'center',
  },
  deleteBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#D178A7',
    borderRadius: 14,
    paddingVertical: 14,
    marginTop: 8,
    backgroundColor: '#FFF7FB',
    borderStyle: 'dotted',
    gap: 5,
  },
  deleteText: {
    fontFamily: font.semiBold,
    fontSize: 16,
    color: '#FF2558',
    textAlign: 'center',
  },
});

export default PostOptionsModal; 