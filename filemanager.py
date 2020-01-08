import os

project_path = '/home/wolf/mmsr'

dataset_path = '{}/MMSR_dataset_2019'.format(project_path)

features_path = '{}/features'.format(dataset_path)

# Features
audio_features_path = '{}/Audio'.format(features_path)
visual_features_path = '{}/Visual'.format(features_path)
metadata_features_path = '{}/Metadata'.format(features_path)

# Audio features
# Block level features
block_level_features_path = '{}/Block level features'.format(audio_features_path)
all_block_level_features_path = '{}/All'.format(block_level_features_path)
component_block_level_features_path = '{}/Component6'.format(block_level_features_path)
# I-Vector features
i_vector_features_path = '{}/i-vector'.format(audio_features_path)

# Metadata features
development_set_genre_features = '{}/devset_GenreFeatures.csv'.format(metadata_features_path)
development_set_tag_features = '{}/devset_TagFeatures.csv'.format(metadata_features_path)
test_set_tag_features = '{}/testset_TagFeatures.csv'.format(metadata_features_path)

# Visual features
# Aesthetic visual features
aesthetic_visual_features_path = '{}/Aesthetic visual features'.format(visual_features_path)
avg_aesthetic_visual_features_path = '{}/Avg'.format(aesthetic_visual_features_path)
avgvar_aesthetic_visual_features_path = '{}/AvgVar'.format(aesthetic_visual_features_path)
med_aesthetic_visual_features_path = '{}/Med'.format(aesthetic_visual_features_path)
medmad_aesthetic_visual_features_path = '{}/MedMad'.format(aesthetic_visual_features_path)

# Deep alex net visual features
deep_alexnet_features_path = '{}/Deep AlexNetFc7'.format(visual_features_path)
avg_deep_alexnet_features_path = '{}/Avg/'.format(deep_alexnet_features_path)
avgvar_deep_alexnet_features_path = '{}/AvgVar/'.format(deep_alexnet_features_path)
med_deep_alexnet_features_path = '{}/Med/'.format(deep_alexnet_features_path)
medmad_deep_alexnet_features_path = '{}/MedMad/'.format(deep_alexnet_features_path)

# Working sets
development_set_ids = '{}/devset_ids.csv'.format(dataset_path)
development_set_movies = '{}/devset_movies.csv'.format(dataset_path)
test_set_ids = '{}/testset_ids.csv'.format(dataset_path)
test_set_movies = '{}/testset_movies.csv'.format(dataset_path)


def get_feature_by_category(feature_path, category = ""):
    for file_name in os.listdir(feature_path):
        if file_name.endswith("{}.csv".format(category)):
            return os.path.join(feature_path, file_name)
