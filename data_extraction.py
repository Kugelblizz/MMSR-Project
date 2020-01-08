# IMPORTS AND SETTINGS

import pandas as pd

from data.filemanager import *


# Action,Adventure,Animation,Children,Comedy,Crime,Documentary,Drama,Fantasy,Film_Noir,Horror,Musical,Mystery,Romance,Sci_Fi,Thriller,War,Western
# 0 - 17


class Movie:

    def __init__(self, movie_id, movie_name):
        self.movie_id = movie_id
        self.movie_name = movie_name
        self.movie_clips = []

    def add_movie_clip(self, clip):
        self.movie_clips.append(clip)


class MovieClip:

    def __init__(self, movie_clip_id):
        self.movie_clip_id = movie_clip_id
        self.aestetic_features = []

    def add_aestetic_features(self, features):
        self.aestetic_features.append(features)


def read_movies(movie_ids_path, movies_path, visual_features):
    movies = []
    ids_frame = pd.read_csv(filepath_or_buffer=movie_ids_path)
    movies_frame = pd.read_csv(filepath_or_buffer=movies_path)
    visual_frame = pd.read_csv(filepath_or_buffer=visual_features)

    for movie_row in movies_frame.itertuples():
        movie = Movie(movie_row.movieId, movie_row.title)
        movie_clip_ids = ids_frame.loc[ids_frame['movieId'] == movie.movie_id]
        for movie_clip_id_row in movie_clip_ids.itertuples():
            clip = MovieClip(movie_clip_id_row.movieclipId)
            visual_data = visual_frame.loc[visual_frame.ix[:,1] == clip.movie_clip_id]
            visual_data = visual_data.iloc[:, 1:] # drop first column
            for (visual_data_column, drop) in visual_data.iteritems():
                clip.add_aestetic_features(float(visual_data_column))
            movie.add_movie_clip(clip)
        movies.append(movie)
    return movies


feature_path = get_feature_by_category(avg_aesthetic_visual_features_path, "All")
devset_movies = read_movies(development_set_ids, development_set_movies, feature_path)
testset_movies = read_movies(test_set_ids, test_set_movies, feature_path)
