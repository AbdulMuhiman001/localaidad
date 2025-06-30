import BlueTick from "@/assets/images/blue_tick.svg";
import FireIcon from "@/assets/images/fire.svg";
import LocaidadLogo from "@/assets/images/locaidad_logo.svg";
import MainIcon1 from "@/assets/images/main_icon_1.svg";
import MainIcon2 from "@/assets/images/main_icon_2.svg";
import MainIcon3 from "@/assets/images/main_icon_3.svg";
import MainIcon4 from "@/assets/images/main_icon_4.svg";
import MainIcon5 from "@/assets/images/main_icon_5.svg";
import MessageIcon from "@/assets/images/message.svg";
import PostImage1 from "@/assets/images/post_image_1.svg";
import PostImage2 from "@/assets/images/post_image_2.svg";
import PostImage3 from "@/assets/images/post_image_3.svg";
import Reaction1 from "@/assets/images/reaction_1.svg";
import Reaction2 from "@/assets/images/reaction_2.svg";
import Reaction3 from "@/assets/images/reaction_3.svg";
import Reaction4 from "@/assets/images/reaction_4.svg";
import Reaction5 from "@/assets/images/reaction_5.svg";
import StoryImage1 from "@/assets/images/story_image_1.svg";
import StoryImage2 from "@/assets/images/story_image_2.svg";
import StoryImage3 from "@/assets/images/story_image_3.svg";
import { default as StoryImage4, default as StoryImage5 } from "@/assets/images/story_image_4.svg";
import PostOptionsModal from "@/components/PostOptionsModal";
import PostReviewModal from "@/components/PostReviewModal";
import { color, font } from "@/utils/constants";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import HomeLoading from "./loading";

const stories = [
  { label: "Sophia", image: StoryImage1 },
  { label: "Activity", image: StoryImage2 },
  { label: "Alert", image: StoryImage3 },
  { label: "News", image: StoryImage4 },
  { label: "More", image: StoryImage5 },
];

// Defensive utility to wrap any string or number in <Text>
function SafeText({ children, style }) {
  if (typeof children === 'string' || typeof children === 'number') {
    return <Text style={style}>{children}</Text>;
  }
  return children;
}

export default function HomeFeed() {
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPost, setSelectedPost] = useState<number | null>(null);
  const [reviewModalVisible, setReviewModalVisible] = useState(false);
  const [reviewModalShown, setReviewModalShown] = useState(false);
  const [posts, setPosts] = useState([
    {
      user: {
        name: "Max Schmidt",
        handle: "@MaxOnTheM8",
        avatar: StoryImage1,
        badge: "Traffic",
        verified: true,
      },
      text: "Stuck on the M8 again 😩 crazy traffic jam! If you're heading this way, maybe grab a coffee first ☕️",
      image: PostImage1,
      location: "3456 London, United Kingdom",
      time: "3m ago",
      stats: { likes: 30, comments: 547, shares: 440, views: '1.2k', dislike: 230 },
      reactions: [Reaction1, Reaction2, Reaction3, Reaction4, Reaction5],
      liked: false,
      disliked: false,
      commented: false,
      shared: false,
      viewed: false,
    },
    {
      user: {
        name: "Amina Fox",
        handle: "@AminaTheFox",
        avatar: StoryImage1,
        badge: "Alert",
        verified: true,
      },
      text: "Fire spotted in the East Wing building! 🚨 Stay away from the area.",
      image: PostImage2,
      location: "12th Ave, Manchester City Center",
      time: "2h ago",
      stats: { likes: 30, comments: 547, shares: 440, views: '1.2k', dislike: 230},
      reactions: [Reaction1, Reaction2, Reaction3, Reaction4, Reaction5],
      liked: false,
      disliked: false,
      commented: false,
      shared: false,
      viewed: false,
    },
    {
      user: {
        name: "Richard Gold",
        handle: "@RichieOnFoot",
        avatar: StoryImage1,
        badge: "Moment",
        verified: true,
      },
      text: "Just witnessed a flash mob dance on Regent Street! 🎉",
      image: PostImage3,
      location: "3456 London, United Kingdom",
      time: "3m ago",
      stats: { likes: 30, comments: 547, shares: 440, views: '1.2k', dislike: 230 },
      reactions: [Reaction1, Reaction2, Reaction3, Reaction4, Reaction5],
      video: true,
      liked: false,
      disliked: false,
      commented: false,
      shared: false,
      viewed: false,
    },
  ]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const openOptions = (index: number) => {
    setSelectedPost(index);
    setModalVisible(true);
  };

  const closeOptions = () => {
    setModalVisible(false);
    setSelectedPost(null);
  };

  const closeReviewModal = () => {
    setReviewModalVisible(false);
  };

  const handleLike = (index: number) => {
    setPosts(prevPosts => prevPosts.map((post, i) => {
      if (i === index) {
        if (post.liked) {
          // Toggle off like
          return {
            ...post,
            liked: false,
            stats: {
              ...post.stats,
              likes: post.stats.likes - 1,
            },
          };
        } else {
          // Toggle on like, turn off dislike if needed
          let newDislike = post.disliked ? post.stats.dislike - 1 : post.stats.dislike;
          return {
            ...post,
            liked: true,
            disliked: false,
            stats: {
              ...post.stats,
              likes: post.stats.likes + 1,
              dislike: newDislike,
            },
          };
        }
      }
      return post;
    }));
  };

  const handleDislike = (index: number) => {
    setPosts(prevPosts => prevPosts.map((post, i) => {
      if (i === index) {
        if (post.disliked) {
          // Toggle off dislike, prevent negative count
          return {
            ...post,
            disliked: false,
            stats: {
              ...post.stats,
              dislike: Math.max(0, post.stats.dislike - 1),
            },
          };
        } else {
          // Toggle on dislike, turn off like if needed
          let newLikes = post.liked ? Math.max(0, post.stats.likes - 1) : post.stats.likes;
          return {
            ...post,
            disliked: true,
            liked: false,
            stats: {
              ...post.stats,
              dislike: post.stats.dislike + 1,
              likes: newLikes,
            },
          };
        }
      }
      return post;
    }));
  };

  const handleComment = (index: number) => {
    setPosts(prevPosts => prevPosts.map((post, i) => {
      if (i === index) {
        const commented = !post.commented;
        return {
          ...post,
          commented,
          stats: {
            ...post.stats,
            comments: commented ? post.stats.comments + 1 : post.stats.comments - 1,
          },
        };
      }
      return post;
    }));
  };

  const handleShare = (index: number) => {
    setPosts(prevPosts => prevPosts.map((post, i) => {
      if (i === index) {
        const shared = !post.shared;
        return {
          ...post,
          shared,
          stats: {
            ...post.stats,
            shares: shared ? post.stats.shares + 1 : post.stats.shares - 1,
          },
        };
      }
      return post;
    }));
  };

  const handleView = (index: number) => {
    setPosts(prevPosts => prevPosts.map((post, i) => {
      if (i === index && !post.viewed) {
        // Convert views to number if it's a string with 'k'
        let views = post.stats.views;
        let newViews;
        if (typeof views === 'string' && views.endsWith('k')) {
          newViews = (parseFloat(views) * 1000) + 1;
        } else {
          newViews = Number(views) + 1;
        }
        // Format back to 'k' if over 1000
        let formattedViews = newViews >= 1000 ? (newViews / 1000).toFixed(1) + 'k' : newViews.toString();
        return {
          ...post,
          viewed: true,
          stats: {
            ...post.stats,
            views: formattedViews,
          },
        };
      }
      return post;
    }));
  };

  if (loading) {
    return <HomeLoading />;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <LocaidadLogo width={120} height={32} />
        <View style={styles.headerIcons}>
          <View style={styles.headerIconButton}>
             <TouchableOpacity onPress={() => router.push("/home/notifications")}><MessageIcon width={22} height={22} /></TouchableOpacity>
            
          </View>
          <View style={styles.headerIconButton}>
           <TouchableOpacity onPress={() => router.push("/home/trending")}>
              <FireIcon width={22} height={22} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Stories Bar */}
      <View style={styles.storiesContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {stories.map((story, i) => (
            <View
              style={[
                styles.storyItem,
              ]}
              key={i}
            >
              <View style={[styles.avatarBorder, i === 0 && styles.avatarBorderActive]}>
                {React.createElement(story.image, { width: 67, height: 67 })}
              </View>
              <Text style={styles.storyLabel}>{story.label}</Text>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Feed */}
      <ScrollView style={styles.feed} showsVerticalScrollIndicator={false}>
        {posts.map((post, i) => (
          <TouchableOpacity
            style={styles.postCard}
            key={i}
            activeOpacity={0.85}
            onLongPress={() => openOptions(i)}
            delayLongPress={500}
          >
            {/* Post Header */}
            <View style={styles.postHeader}>
              {React.createElement(post.user.avatar, { width: 40, height: 40, style: styles.postAvatar })}
              <View style={{ marginLeft: 10, flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                <Text style={styles.postName}>{post.user.name}</Text>
                <Text style={styles.postHandle}>{post.user.handle}</Text>
                {post.user.verified && <BlueTick width={28} height={28}  />}
                <Text style={styles.postBadge}>{post.user.badge}</Text>
              </View>
              {/* Three-dot button */}
              <TouchableOpacity onPress={() => {
                setSelectedPost(i);
                setReviewModalVisible(true);
              }} style={{ padding: 8, marginLeft: 8 }}>
                <Text style={{ fontSize: 22, color: '#888' }}>⋮</Text>
              </TouchableOpacity>
            </View>
            {/* Post Text */}
            <Text style={styles.postText}>{post.text}</Text>
            {/* Post Image/Video */}
            <View style={styles.postMediaContainer}>
              {React.createElement(post.image, { width: '100%', height: 210, style: styles.postMedia })}
              {post.video}
            </View>
            {/* Post Footer */}
            <View style={styles.postFooter}>
              <Text style={styles.postLocation}>{post.location}</Text>
              <Text style={styles.postTime}>{post.time}</Text>
            </View>
            {/* Post Actions */}
            <View style={styles.postActions}>
              <View style={styles.actionItem}>
                <TouchableOpacity onPress={() => handleLike(i)}>
                  <Reaction1 width={18} height={18} fill={post.liked ? "#47C2FF" : "#fff"} />
                </TouchableOpacity>
                <SafeText style={styles.actionText}>{post.stats.likes}</SafeText>
              </View>
              <View style={styles.actionItem}>
                <TouchableOpacity onPress={() => handleComment(i)}>
                  <Reaction2 width={18} height={18} fill={post.commented ? "#47C2FF" : "#fff"} />
                </TouchableOpacity>
                <SafeText style={styles.actionText}>{post.stats.comments}</SafeText>
              </View>
              <View style={styles.actionItem}>
                <TouchableOpacity onPress={() => handleShare(i)}>
                  <Reaction3 width={18} height={18} fill={post.shared ? "#fff" : "#fff"} />
                </TouchableOpacity>
                <SafeText style={styles.actionText}>{post.stats.shares}</SafeText>
              </View>
              <View style={styles.actionItem}>
                <TouchableOpacity onPress={() => handleView(i)}>
                  <Reaction4 width={18} height={18} fill={post.viewed ? "#47C2FF" : "#fff"} />
                </TouchableOpacity>
                <SafeText style={styles.actionText}>{post.stats.views}</SafeText>
              </View>
              <View style={styles.actionItem}>
                <TouchableOpacity onPress={() => handleDislike(i)}>
                  <Reaction5 width={18} height={18} fill={post.disliked ? "#47C2FF" : "#fff"} />
                </TouchableOpacity>
                <SafeText style={styles.actionText}>{post.stats.dislike}</SafeText>
              </View>
            </View>
          </TouchableOpacity>
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

      {/* Post Options Modal */}
      <PostOptionsModal visible={modalVisible} onClose={closeOptions} />
      {/* Post Review Modal (opened from three-dot button) */}
      <PostReviewModal visible={reviewModalVisible} onClose={closeReviewModal} />
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
    borderBottomWidth: 1,
    borderBottomColor: "#fff",
  },
  storyItem: {
    alignItems: "center",
    marginRight: 16,
  },
  avatarBorder: {
    width: 68,
    height: 68,
    borderRadius: 33,
    borderWidth: 2,
    borderColor: "#FF2558",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    overflow: "hidden",
  },
  avatarBorderActive: {
    borderColor: "#FF2558",
  },
  avatarImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    resizeMode: "cover",
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
  postCard: {
    backgroundColor: "#F8F8F8",
    borderRadius: 16,
    padding: 12,
    marginBottom: 18,
  },
  postHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  postAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    resizeMode: "cover",
  },
  postName: {
    fontSize: 15,
    fontFamily: font.semiBold,
    color: color.black,
    marginRight: 4,
  },
  postHandle: {
    fontSize: 12,
    color: color.gray400,
    fontFamily: font.regular,
    marginRight: 8,
    marginLeft: 4,
  },
 postBadge: {
  fontSize: 13,
  fontFamily: font.regular,
  color: color.gray400,
  marginLeft: 4,
  backgroundColor: "#F1F4F9",  
  paddingHorizontal: 10,       
  paddingVertical: 4,          
  borderRadius: 20,            
},
  postText: {
    fontSize: 14,
    color: color.black,
    fontFamily: font.regular,
    marginBottom: 8,
  },
  postMediaContainer: {
    marginTop: 8,
    marginBottom: 8,
    borderRadius: 12,
    overflow: "hidden",
    position: "relative",
  },
  postMedia: {
    width: "100%",
    height: 180,
    borderRadius: 12,
    resizeMode: "cover",
  },
  playButton: {
    position: "absolute",
    top: "40%",
    left: "45%",
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 24,
    padding: 8,
  },
  postFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  postLocation: {
    fontSize: 12,
    color: color.gray400,
    fontFamily: font.regular,
  },
  postTime: {
    fontSize: 12,
    color: color.gray400,
    fontFamily: font.regular,
  },
  postActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
    paddingHorizontal: 8,
  },
  actionItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  actionText: {
    fontSize: 12,
    color: color.gray400,
    fontFamily: font.regular,
    marginLeft: 2,
  },
  fab: {
    position: "absolute",
    right: 24,
    bottom: 70,
    backgroundColor: "#FF2558",
    width: 52,
    height: 52,
    borderRadius: 26,
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
  lastStoryItem: {
    marginRight: 2,
  },
}); 