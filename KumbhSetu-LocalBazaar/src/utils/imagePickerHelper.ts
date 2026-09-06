import * as ImagePicker from 'expo-image-picker';

export const SAMPLE_SHOP_IMAGES = [
  {
    id: 'sample_bhojanalaya',
    title: 'Mahaprasad Bhojanalaya',
    url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'sample_sweetshop',
    title: 'Nashik Mithai & Sweets',
    url: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'sample_puja_stall',
    title: 'Panchavati Puja Samagri',
    url: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'sample_chivda_stall',
    title: 'Laxminarayan Chivda Mart',
    url: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'sample_grapes_agro',
    title: 'Godavari Fresh Grapes',
    url: 'https://images.unsplash.com/photo-1537640538966-79f369143f8f?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'sample_dharamshala',
    title: 'Ramkund Yatri Niwas',
    url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
  },
];

export const SAMPLE_ITEM_IMAGES = [
  {
    id: 'item_misal',
    title: 'Special Nashik Misal Pav',
    url: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'item_thali',
    title: 'Full Satvik Thali Meal',
    url: 'https://images.unsplash.com/photo-1613292443284-8d10ef9383fe?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'item_pedha',
    title: 'Trimbak Kandi Peda 500g',
    url: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'item_puja_thali',
    title: 'Brass Snan Puja Kit',
    url: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'item_grapes',
    title: 'Farm Fresh Black Grapes 1kg',
    url: 'https://images.unsplash.com/photo-1537640538966-79f369143f8f?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'item_tea',
    title: 'Ginger Masala Cutting Chai',
    url: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80',
  },
];

export const pickImageFromGallery = async (): Promise<string | null> => {
  try {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      return null;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      return result.assets[0].uri;
    }
    return null;
  } catch (error) {
    console.warn('Gallery pick error:', error);
    return null;
  }
};

export const takePhotoWithCamera = async (): Promise<string | null> => {
  try {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      return null;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      return result.assets[0].uri;
    }
    return null;
  } catch (error) {
    console.warn('Camera capture error:', error);
    return null;
  }
};
