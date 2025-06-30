import StoryImage1 from "@/assets/images/story_image_1.svg";
import StoryImage2 from "@/assets/images/story_image_2.svg";
import StoryImage3 from "@/assets/images/story_image_3.svg";
import StoryImage4 from "@/assets/images/story_image_4.svg";
import { font } from "@/utils/constants";
import React, { useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
// eslint-disable-next-line import/no-unresolved
import BlueTick from "@/assets/images/blue_tick.svg";
import BackArrow from "@/assets/images/left arrow.svg";
import Refresh from "@/assets/images/loop-left-fill.svg";
import PostImage1 from "@/assets/images/post_image_1.svg";
import PostImage2 from "@/assets/images/post_image_2.svg";
import PostImage3 from "@/assets/images/post_image_3.svg";
import Reaction1 from "@/assets/images/reaction_1.svg";
import Reaction2 from "@/assets/images/reaction_2.svg";
import Reaction3 from "@/assets/images/reaction_3.svg";
import Reaction4 from "@/assets/images/reaction_4.svg";
import Reaction5 from "@/assets/images/reaction_5.svg";
import Search from '@/assets/images/search-2-line.svg';
import StoryImage5 from "@/assets/images/story_image_5.svg";
import TrendingLocation from "@/assets/images/trending-fire-icon.svg";
import Slider from '@react-native-community/slider';
import { router } from 'expo-router';

const trendingCategories = [
  { label: "Activity", image: StoryImage2 },
  { label: "Alert", image: StoryImage3 },
  { label: "News", image: StoryImage4 },
  { label: "Moments", image: StoryImage5 },
];

const trendingLocations = [
  { name: "Frankfurt", posts: 542, moments: 198, distance: "2 km away" },
  { name: "Offenbach", posts: 173, alerts: 79, distance: "15 km away" },
  { name: "Offenbach", posts: 173, alerts: 79, distance: "15 km away" },
  { name: "Langen", posts: 214, updates: 55, distance: "22 km away" },
  { name: "New York", posts: 4564, stories: 2320, distance: "150 km away" },
];

const trendingPosts = [
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
    time: "2 hr ago",
    stats: { likes: 30, comments: 547, shares: 440, views: '1.2k', dislike: 230 },
  },
  {
    user: {
      name: "Richard Gold",
      handle: "@RichInAction",
      avatar: StoryImage1,
      badge: "Moment",
      verified: true,
    },
    text: "Just witnessed a flash mob dance on Regent Street! 🎉",
    image: PostImage3,
    location: "3456 London, United Kingdom",
    time: "3m ago",
    stats: { likes: 30, comments: 547, shares: 440, views: '1.2k', dislike: 230 },
    video: true,
  },
];

export default function Trending() {
  const [radius, setRadius] = useState(25);
  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push("/home/feed")}>
          <BackArrow width={25} height={25} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>What&apos;s Hot Right Now</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <TouchableOpacity onPress={() => router.push("/home/trending")}>
           <Refresh width={25} height={25} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Bar & Location */}
      <View style={styles.searchSection}>
        <View style={styles.searchBar}>
          <Search width={22} height={22}style={{left:6}} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search any city or neighborhood..."
            placeholderTextColor="#222"
          />
        </View>
        <View style={styles.radiusRow}>
          <Text style={styles.radiusLabel}>Customize Radius <Text style={{ color: '#FF2558',fontFamily:font.semiBold }}>{Math.round(radius)}km</Text></Text>
          <Text style={styles.locationText}>@ Manchester City Center</Text>
        </View>
        <Slider
          style={{ width: '100%', height: 50, marginTop: 22, marginBottom: 4 }}
          minimumValue={0}
          maximumValue={100}
          value={radius}
          onValueChange={setRadius}
        />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Trending Categories */}
        <View style={styles.sectionRow}>
          <Text style={styles.sectionTitle}>Trending Categories</Text>
          <TouchableOpacity><Text style={styles.sectionAction}>View All</Text></TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesScroll}>
          {trendingCategories.map((cat, i) => (
            <View style={styles.categoryItem} key={i}>
              <View style={styles.categoryAvatar}>{React.createElement(cat.image, { width: 62, height: 62 })}</View>
              <Text style={styles.categoryLabel}>{cat.label}</Text>
            </View>
          ))}
        </ScrollView>

        {/* Trending Locations */}
        <View style={styles.sectionRow}>
          <Text style={styles.sectionTitle}>Trending Locations</Text>
          <TouchableOpacity><Text style={styles.sectionAction}>View All</Text></TouchableOpacity>
        </View>
        <View style={styles.locationsList}>
          {trendingLocations.map((loc, i) => (
            <View style={styles.locationItem} key={i}>
              <TrendingLocation width={38} height={38} />
              <View style={{ flex: 1, marginLeft: 10 }}>
                <Text style={styles.locationName}>{loc.name}</Text>
                <Text style={styles.locationStats}>
                  {loc.posts} posts{loc.moments ? ` · ${loc.moments} trending moments` : ''}{loc.alerts ? ` · ${loc.alerts} alerts` : ''}{loc.updates ? ` · ${loc.updates} traffic updates` : ''}{loc.stories ? ` · ${loc.stories} local stories` : ''}
                </Text>
              </View>
              <Text style={styles.locationDistance}>{loc.distance}</Text>
            </View>
          ))}
        </View>

        {/* Trending Posts */}
        <View style={styles.sectionRow}>
          <Text style={styles.sectionTitle}>Trending Posts</Text>
          <TouchableOpacity><Text style={styles.sectionAction}>View All</Text></TouchableOpacity>
        </View>
        <View style={styles.trendingPostsList}>
          {trendingPosts.map((post, i) => (
            <View style={styles.postCard} key={i}>
              {/* Post Header */}
              <View style={styles.postHeader}>
                {React.createElement(post.user.avatar, { width: 40, height: 40, style: styles.postAvatar })}
                <View style={{ marginLeft: 10, flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={styles.postName}>{post.user.name}</Text>
                  <Text style={styles.postHandle}>{post.user.handle}</Text>
                  {post.user.verified && <BlueTick width={20} height={20} />}
                  <Text style={styles.postBadge}>{post.user.badge}</Text>
                </View>
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
                  <Reaction1 width={18} height={18} />
                  <Text style={styles.actionText}>{post.stats.likes}</Text>
                </View>
                <View style={styles.actionItem}>
                  <Reaction2 width={18} height={18} />
                  <Text style={styles.actionText}>{post.stats.comments}</Text>
                </View>
                <View style={styles.actionItem}>
                  <Reaction3 width={18} height={18} />
                  <Text style={styles.actionText}>{post.stats.shares}</Text>
                </View>
                <View style={styles.actionItem}>
                  <Reaction4 width={18} height={18} />
                  <Text style={styles.actionText}>{post.stats.views}</Text>
                </View>
                <View style={styles.actionItem}>
                  <Reaction5 width={18} height={18} />
                  <Text style={styles.actionText}>{post.stats.dislike}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 48,
    paddingBottom: 8,
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontFamily: font.regular,
    fontSize: 18,
    color: '#222',
    flex: 1,
    textAlign: 'center',
  },
  searchSection: {
    paddingHorizontal: 16,
    paddingTop: 2,
    paddingBottom: 8,
    backgroundColor: '#fff',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingVertical: 2,
    marginBottom: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    marginLeft: 8,
    left:4,
    color: '#222',
    fontFamily: font.regular,
  },
  radiusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 2,
    marginTop:6,
  },
  radiusLabel: {
    fontFamily: font.semiBold,
    fontSize: 14,
    color: '#222',
  },
  locationText: {
    fontFamily: font.regular,
    fontSize: 13,
    color: '#FF2558',
  },
  sectionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 18,
    marginBottom: 6,
  },
  sectionTitle: {
    fontFamily: font.semiBold,
    fontSize: 16,
    color: '#222',
  },
  sectionAction: {
    fontFamily: font.regular,
    fontSize: 13,
    color: '#FF2558',
  },
  categoriesScroll: {
    paddingLeft: 16,
    marginBottom: 8,
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: 18,
  },
  categoryAvatar: {
    width: 65,
    height: 65,
    borderRadius: 33,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
    borderWidth: 2,
    borderColor: '#FF2558',
  },
  categoryLabel: {
    fontFamily: font.regular,
    fontSize: 13,
    color: '#222',
    marginTop: 2,
  },
  locationsList: {
    marginTop: 2,
    marginBottom: 12,
  },
  locationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
  },
  locationName: {
    fontFamily: font.semiBold,
    fontSize: 15,
    color: '#222',
  },
  locationStats: {
    fontFamily: font.regular,
    fontSize: 13,
    color: '#888',
    marginTop: 2,
  },
  locationDistance: {
    fontFamily: font.regular,
    fontSize: 13,
    color: '#888',
    marginLeft: 8,
  },
  trendingPostsList: {
    marginTop: 2,
    marginBottom: 24,
  },
  postCard: {
    backgroundColor: '#F8F8F8',
    borderRadius: 16,
    padding: 12,
    marginBottom: 18,
    marginHorizontal: 16,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  postAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    resizeMode: 'cover',
  },
  postName: {
    fontFamily: font.semiBold,
    fontSize: 15,
    color: '#222',
    marginRight: 4,
  },
  postHandle: {
    fontFamily: font.regular,
    fontSize: 12,
    color: '#888',
    marginRight: 8,
    marginLeft: 4,
  },
  postBadge: {
    fontFamily: font.regular,
    fontSize: 13,
    color: '#888',
    marginLeft: 4,
    marginRight: 0,
  },
  postText: {
    fontFamily: font.regular,
    fontSize: 14,
    color: '#222',
    marginBottom: 8,
  },
  postMediaContainer: {
    marginTop: 8,
    marginBottom: 8,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  postMedia: {
    width: '100%',
    height: 180,
    borderRadius: 12,
    resizeMode: 'cover',
  },
  postFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  postLocation: {
    fontFamily: font.regular,
    fontSize: 12,
    color: '#888',
  },
  postTime: {
    fontFamily: font.regular,
    fontSize: 12,
    color: '#888',
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    paddingHorizontal: 8,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  actionText: {
    fontFamily: font.regular,
    fontSize: 12,
    color: '#888',
    marginLeft: 2,
  },
}); 