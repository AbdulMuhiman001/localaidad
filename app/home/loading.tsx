import FireIcon from "@/assets/images/fire.svg";
import LocaidadLogo from "@/assets/images/locaidad_logo.svg";
import MainIcon1 from "@/assets/images/main_icon_1.svg";
import MainIcon2 from "@/assets/images/main_icon_2.svg";
import MainIcon3 from "@/assets/images/main_icon_3.svg";
import MainIcon4 from "@/assets/images/main_icon_4.svg";
import MainIcon5 from "@/assets/images/main_icon_5.svg";
import MessageIcon from "@/assets/images/message.svg";
import StoryImage1 from "@/assets/images/story_image_1.svg";
import { color, font } from "@/utils/constants";
import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";

type SkeletonProps = {
  width: number | string;
  height: number | string;
  borderRadius?: number;
  style?: object;
};

// Skeleton placeholder component
const Skeleton = ({ width, height, borderRadius = 8, style = {} }: SkeletonProps) => (
  <View
    style={[
      {
        width,
        height,
        borderRadius,
        backgroundColor: "#E0E0E0",
        marginRight: 12,
      },
      style,
    ]}
  />
);

export default function HomeLoading() {
  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
            <View style={styles.header}>
              <LocaidadLogo width={120} height={32} />
              <View style={styles.headerIcons}>
                <View style={styles.headerIconButton}>
                  <MessageIcon width={22} height={22} />
                </View>
                <View style={styles.headerIconButton}>
                  <FireIcon width={22} height={22} />
                </View>
              </View>
            </View>
      

      {/* Stories Skeleton */}
      <View style={styles.storiesContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {/* User story with avatar and red border */}
          <View style={styles.storyItem}>
            <View style={styles.avatarBorder}>
              <StoryImage1 width={65} height={65} style={styles.avatarImage} />
            </View>
            <Text style={styles.storyLabel}>Sophia</Text>
          </View>
          {/* Other stories */}
          {[...Array(5)].map((_, i) => (
            <View style={styles.storyItem} key={i}>
              <Skeleton width={56} height={56} borderRadius={28} />
              <Skeleton width={36} height={10} borderRadius={5} style={{ marginTop: 6 }} />
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Feed Skeleton */}
      <ScrollView style={styles.feed} showsVerticalScrollIndicator={false}>
        {[...Array(3)].map((_, i) => (
          <View style={styles.postSkeleton} key={i}>
            <View style={styles.postHeader}>
              <Skeleton width={40} height={40} borderRadius={20} />
              <View style={{ marginLeft: 10 }}>
                <Skeleton width={100} height={12} />
                <Skeleton width={60} height={10} style={{ marginTop: 6 }} />
              </View>
            </View>
            <Skeleton width={"100%"} height={160} style={{ marginTop: 12 }} />
            <View style={styles.postActions}>
              <Skeleton width={30} height={10} />
              <Skeleton width={30} height={10} />
              <Skeleton width={30} height={10} />
              <Skeleton width={30} height={10} />
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Floating Action Button */}
      <View style={styles.fab}>
        <MaterialIcons name="edit" size={26} color="#fff" />
      </View>

      {/* Bottom Tab Bar */}
      <View style={styles.tabBar}>
        <MainIcon1 width={20} height={20} />
        <MainIcon2 width={20} height={20} />
        <MainIcon3 width={21} height={21} />
        <MainIcon4 width={20} height={20} />
        <MainIcon5 width={22} height={22} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
   header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 20,
      paddingTop: 45,
      paddingBottom: 8,
    },
    logo: {
      fontSize: 22,
      fontFamily: font.semiBold,
      letterSpacing: 1.2,
      color: "#222",
    },
    headerIcons: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
    },
    headerIconButton: {
      backgroundColor: color.gray100,
      borderRadius: 16,
      padding: 8,
      marginLeft: 8,
    },
    headerIconImage: {
      width: 22,
      height: 22,
      resizeMode: "contain",
    },
  storiesContainer: {
    flexDirection: "row",
    paddingVertical: 10,
    paddingLeft: 16,
    
  },
  storyItem: {
    alignItems: "center",
    marginRight: 16,
  },
  storyLabel: {
    fontSize: 12,
    color: "#888",
    marginTop: 6,
    fontFamily: font.medium,
  },
  feed: {
    flex: 1,
    paddingHorizontal: 16,
    marginTop: 8,
  },
  postSkeleton: {
    backgroundColor: "#F8F8F8",
    borderRadius: 16,
    padding: 16,
    marginBottom: 18,
  },
  postHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  postActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 14,
    paddingHorizontal: 10,
  },
  fab: {
    position: "absolute",
    right: 24,
    bottom: 70,
    backgroundColor: "#FF2558",
    width: 52,
    height: 52,
    borderRadius: 36,
    alignItems: "center",
    justifyContent: "center",
    elevation: 8,
    shadowColor: "#FF2558",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 60,
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
    backgroundColor: "#fff",
  },
  avatarBorder: {
    width: 68,
    height: 68,
    borderRadius: 33,
    borderWidth: 3,
    borderColor: "#FF2558",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  avatarImage: {
    width: 68,
    height: 68,
    borderRadius: 24,
    resizeMode: "cover",
  },
}); 