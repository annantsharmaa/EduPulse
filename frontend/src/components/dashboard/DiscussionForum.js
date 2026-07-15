import React, { useState } from 'react';

const DiscussionForum = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [newPost, setNewPost] = useState({ title: '', content: '', category: 'General' });
  const [showNewPost, setShowNewPost] = useState(false);

  const textClass = "text-gray-800 dark:text-gray-100";
  const subtextClass = "text-gray-500 dark:text-gray-400";
  const cardClass = "bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-5";
  const inputClass = "w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:border-blue-500 text-sm";

  const categories = ['All', 'Data Structures', 'DBMS', 'AI/ML', 'Operating Systems', 'General'];
  
  const [posts, setPosts] = useState([
    {
      id: 1, title: 'How to implement AVL Tree rotation?', author: 'Ananya Sharma', category: 'Data Structures',
      content: 'Can someone explain the rotation logic for AVL trees with an example?',
      date: '2 hours ago', replies: 4, views: 45, solved: false,
      answers: [
        { author: 'Dr. Rajesh Kumar', role: 'faculty', content: 'Great question! AVL rotations are of 4 types: LL, RR, LR, RL. Here is a detailed explanation...', date: '1 hour ago', likes: 8 },
        { author: 'Priya Singh', role: 'student', content: 'I found this helpful: https://visualgo.net/en/bst - great visualization tool!', date: '30 min ago', likes: 3 },
      ],
    },
    {
      id: 2, title: 'DBMS Normalization doubt', author: 'Arjun Patel', category: 'DBMS',
      content: 'Struggling with BCNF vs 3NF. When do we use each?',
      date: '5 hours ago', replies: 2, views: 32, solved: true,
      answers: [
        { author: 'Dr. Sunita Patel', role: 'faculty', content: 'BCNF is stricter than 3NF. Use BCNF when you need to eliminate ALL functional dependencies where the determinant is not a candidate key.', date: '3 hours ago', likes: 12, accepted: true },
      ],
    },
  ]);

  const createPost = () => {
    if (!newPost.title || !newPost.content) return;
    setPosts([{
      id: Date.now(), ...newPost, author: 'You', date: 'Just now', replies: 0, views: 0, solved: false, answers: []
    }, ...posts]);
    setNewPost({ title: '', content: '', category: 'General' });
    setShowNewPost(false);
  };

  const filteredPosts = activeCategory === 'all' ? posts : posts.filter(p => p.category.toLowerCase() === activeCategory.toLowerCase());

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className={`text-2xl font-bold ${textClass}`}>💬 Discussion Forum</h2>
        <button onClick={() => setShowNewPost(!showNewPost)} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium">
          + New Discussion
        </button>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map(c => (
          <button key={c} onClick={() => setActiveCategory(c.toLowerCase())} className={`px-3 py-1.5 rounded-full text-sm font-medium transition ${
            activeCategory === c.toLowerCase() ? 'bg-blue-600 text-white' : `bg-gray-100 dark:bg-gray-700 ${textClass} hover:bg-gray-200 dark:hover:bg-gray-600`
          }`}>{c}</button>
        ))}
      </div>

      {/* New Post Form */}
      {showNewPost && (
        <div className={`${cardClass} mb-6`}>
          <h3 className={`font-semibold ${textClass} mb-4`}>Create New Discussion</h3>
          <select className={`${inputClass} mb-3`} value={newPost.category} onChange={(e) => setNewPost({...newPost, category: e.target.value})}>
            {categories.filter(c => c !== 'All').map(c => <option key={c}>{c}</option>)}
          </select>
          <input type="text" className={`${inputClass} mb-3`} placeholder="Discussion title..." value={newPost.title} onChange={(e) => setNewPost({...newPost, title: e.target.value})} />
          <textarea className={`${inputClass} mb-3`} rows="3" placeholder="Describe your question or topic..." value={newPost.content} onChange={(e) => setNewPost({...newPost, content: e.target.value})}></textarea>
          <div className="flex space-x-2">
            <button onClick={createPost} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium">Post</button>
            <button onClick={() => setShowNewPost(false)} className="px-4 py-2 border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 rounded-lg text-sm">Cancel</button>
          </div>
        </div>
      )}

      {/* Posts */}
      <div className="space-y-4">
        {filteredPosts.map(post => (
          <div key={post.id} className={cardClass}>
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className={`font-semibold ${textClass}`}>{post.title}</h3>
                <div className="flex items-center space-x-3 mt-1">
                  <span className={`text-xs ${subtextClass}`}>👤 {post.author}</span>
                  <span className="text-xs px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full">{post.category}</span>
                  {post.solved && <span className="text-xs px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full">✅ Solved</span>}
                </div>
              </div>
              <span className={`text-xs ${subtextClass}`}>{post.date}</span>
            </div>
            <p className={`text-sm ${subtextClass} mb-3`}>{post.content}</p>
            <div className="flex items-center space-x-4 text-xs">
              <span className={subtextClass}>💬 {post.replies} replies</span>
              <span className={subtextClass}>👁️ {post.views} views</span>
              <button className="text-blue-600 dark:text-blue-400 font-medium hover:underline">View Discussion →</button>
            </div>

            {/* Answers */}
            {post.answers.length > 0 && (
              <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 space-y-3">
                {post.answers.map((ans, j) => (
                  <div key={j} className={`p-3 rounded-lg ${ans.role === 'faculty' ? 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800' : 'bg-gray-50 dark:bg-gray-700/50'}`}>
                    <div className="flex justify-between items-center mb-1">
                      <span className={`text-xs font-medium ${textClass}`}>
                        {ans.author}
                        {ans.role === 'faculty' && <span className="ml-1 px-1.5 py-0.5 bg-blue-600 text-white text-xs rounded">Faculty</span>}
                        {ans.accepted && <span className="ml-1 text-green-600">✅ Accepted</span>}
                      </span>
                      <span className={`text-xs ${subtextClass}`}>{ans.date} | 👍 {ans.likes}</span>
                    </div>
                    <p className={`text-sm ${textClass}`}>{ans.content}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DiscussionForum;
