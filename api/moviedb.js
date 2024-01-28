import axios from 'axios'
import { apiKey } from '../constants/api'

// endpoints
const apiBaseUrl = 'https://api.themoviedb.org/3/'
const trendingMoviesEndpoint = `${apiBaseUrl}/trending/movie/day?language=en-US?api_key=${apiKey}`